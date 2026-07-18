require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

// Assuming frontend sends the token they get from Google
const googleClient = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID'); 

// Nodemailer config
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth Route
app.post('/api/auth/google', async (req, res) => {
  const { credential, gdprConsent } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      // audience: 'YOUR_GOOGLE_CLIENT_ID',  // uncomment and set if needed
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    // Upsert User
    const result = await pool.query(
      `INSERT INTO users (google_id, email, name, picture_url, gdpr_consent) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (google_id) 
       DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, picture_url = EXCLUDED.picture_url, gdpr_consent = EXCLUDED.gdpr_consent
       RETURNING *`,
      [googleId, email, name, picture, gdprConsent]
    );

    const dbUser = result.rows[0];

    // Create custom JWT
    const accessToken = jwt.sign({ userId: dbUser.id, email: dbUser.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token: accessToken, user: { id: dbUser.id, name: dbUser.name, email: dbUser.email, picture: dbUser.picture_url } });
  } catch (error) {
    console.error('Auth error', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// Get Cart
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cart_items WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Cart (Sync from local to remote)
app.post('/api/cart/sync', authenticateToken, async (req, res) => {
  const items = req.body.items; // array of { productId, name, price, quantity, customizations }
  const userId = req.user.userId;
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    
    for (const item of items) {
      await client.query(
        `INSERT INTO cart_items (user_id, product_id, name, price, quantity, customizations, added_at)
         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
        [userId, item.productId, item.name, item.price, item.quantity, item.customizations || {}]
      );
    }
    
    await client.query('COMMIT');
    
    const updated = await client.query('SELECT * FROM cart_items WHERE user_id = $1', [userId]);
    res.json(updated.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

// GDPR - Right to be forgotten
app.delete('/api/user', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.userId]);
    res.json({ message: 'User data completely removed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cron Job for Abandoned Carts (Runs every hour)
// Checks for items added between 24 and 25 hours ago to send a single reminder
cron.schedule('0 * * * *', async () => {
  console.log('Running abandoned cart check...');
  try {
    // Find users with items older than 24 hours but newer than 25 hours
    // to prevent sending multiple emails to the same person.
    const query = `
      SELECT u.id, u.email, u.name, json_agg(c.*) as cart_items
      FROM users u
      JOIN cart_items c ON u.id = c.user_id
      WHERE c.added_at < NOW() - INTERVAL '24 hours'
        AND c.added_at > NOW() - INTERVAL '25 hours'
      GROUP BY u.id
    `;
    
    const result = await pool.query(query);
    
    for (const row of result.rows) {
      const emailHtml = `
        <h3>Hola ${row.name || 'amigo(a)'},</h3>
        <p>Notamos que dejaste algunos productos excelentes en tu carrito de SAGASON. ¡Aún están disponibles!</p>
        <ul>
          ${row.cart_items.map(i => `<li>${i.name} (x${i.quantity}) - $${i.price}</li>`).join('')}
        </ul>
        <p><a href="https://sagason.cl" style="padding: 10px 20px; background-color: #0EA5E9; color: white; text-decoration: none; border-radius: 5px;">Terminar mi compra</a></p>
      `;

      await transporter.sendMail({
        from: '"SAGASON" <' + process.env.SMTP_USER + '>',
        to: row.email,
        subject: "¡No te olvides de tu carrito en SAGASON! 🛒",
        html: emailHtml,
      });
      console.log(`Abandoned cart email sent to ${row.email}`);
    }
  } catch (error) {
    console.error('Error running abandoned cart cron:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
