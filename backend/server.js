require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios'); // Asegurar tener axios instalado o usar fetch

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

// Get Prices (Syncs from ERP)
app.get('/api/prices', async (req, res) => {
  try {
    const erpUrl = process.env.ERP_URL || 'http://localhost:4000';
    const erpRes = await fetch(`${erpUrl}/api/recipes/export-prices`);
    if (!erpRes.ok) {
      throw new Error('No se pudo contactar al ERP');
    }
    const data = await erpRes.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching prices from ERP:', err.message);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

// Forward Website Orders to ERP
app.post('/api/website-order', async (req, res) => {
  try {
    const erpUrl = process.env.ERP_URL || 'http://localhost:4000';
    const erpRes = await fetch(`${erpUrl}/api/sales/website-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    if (!erpRes.ok) {
      throw new Error(`ERP returned ${erpRes.status}`);
    }
    
    const data = await erpRes.json();
    res.status(201).json(data);
  } catch (err) {
    console.error('Error forwarding order to ERP:', err.message);
    res.status(500).json({ error: 'Failed to forward order' });
  }
});

// Flow Integration Helpers
const FLOW_API_KEY = process.env.FLOW_API_KEY || '';
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || '';
const FLOW_API_URL = process.env.FLOW_API_URL || 'https://sandbox.flow.cl/api'; // Cambiar a https://www.flow.cl/api en prod

function getFlowSignature(params) {
  const keys = Object.keys(params).sort();
  let stringToSign = '';
  keys.forEach(key => {
    stringToSign += `${key}=${params[key]}&`;
  });
  stringToSign = stringToSign.slice(0, -1);
  return crypto.createHmac('sha256', FLOW_SECRET_KEY).update(stringToSign).digest('hex');
}

// Generar link de pago y guardar cotización
app.post('/api/checkout', async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, customer_address, product, cartItems, totalPrice } = req.body;
    
    const commerceOrder = `ORD-${Date.now()}`;
    
    // 1. Guardar orden en ERP como QUOTE
    let erpOrderId = null;
    try {
      const erpUrl = process.env.ERP_URL || 'http://localhost:4000';
      const erpRes = await fetch(`${erpUrl}/api/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: `${customer_name} (${customer_email})`,
          customerEmail: customer_email,
          status: 'QUOTE',
          discount: 0,
          items: cartItems.map(i => ({ recipeId: i.productId || 1, quantity: i.quantity, unitPrice: i.price }))
        })
      });
      if (erpRes.ok) {
        const erpData = await erpRes.json();
        erpOrderId = erpData.id;
      }
    } catch (erpError) {
      console.warn("Failed to save to ERP during checkout:", erpError.message);
    }

    // 2. Comunicarse con Flow
    const params = {
      apiKey: FLOW_API_KEY,
      commerceOrder: commerceOrder,
      subject: product || 'Compra SAGASON',
      currency: 'CLP',
      amount: Math.round(totalPrice),
      email: customer_email,
      urlConfirmation: `${process.env.PUBLIC_URL || 'http://localhost:5000'}/api/flow-webhook`,
      urlReturn: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/exito`,
    };

    const signature = getFlowSignature(params);
    params.s = signature;

    const formParams = new URLSearchParams(params);

    const flowRes = await fetch(`${FLOW_API_URL}/payment/create`, {
      method: 'POST',
      body: formParams
    });

    const flowData = await flowRes.json();

    if (!flowRes.ok) {
      console.error("Flow API Error:", flowData);
      throw new Error(flowData.message || 'Error al generar link de Flow');
    }

    const paymentUrl = `${flowData.url}?token=${flowData.token}`;

    res.json({ paymentUrl, orderId: erpOrderId });
  } catch (error) {
    console.error('Error in checkout:', error.message);
    res.status(500).json({ error: 'Error generating checkout link' });
  }
});

// Webhook para confirmación de pago desde Flow
app.post('/api/flow-webhook', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send('Token missing');

    const params = { apiKey: FLOW_API_KEY, token };
    const signature = getFlowSignature(params);
    
    const flowRes = await fetch(`${FLOW_API_URL}/payment/getStatus?apiKey=${FLOW_API_KEY}&token=${token}&s=${signature}`);
    const flowData = await flowRes.json();

    if (flowData.status === 2) { // 2 = Pagado
      console.log(`Pago confirmado para orden: ${flowData.commerceOrder}`);
      // TODO: Actualizar estado de ERP a 'SALE' o 'PAGADO' si tenemos el orderId mapeado
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error en Flow Webhook:', error.message);
    res.status(500).send('Error');
  }
});

// Endpoint protegido para obtener los pedidos del usuario autenticado
app.get('/api/my-orders', authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(400).json({ error: 'Usuario no tiene email' });
    }

    const erpUrl = process.env.ERP_URL || 'http://localhost:4000';
    const erpRes = await fetch(`${erpUrl}/api/sales/customer/${encodeURIComponent(email)}`);
    
    if (!erpRes.ok) {
      throw new Error('Error al obtener pedidos del ERP');
    }

    const orders = await erpRes.json();
    res.json(orders);
  } catch (error) {
    console.error('Error in /api/my-orders:', error.message);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Endpoint público para el Cotizador B2B
app.post('/api/b2b-quote', async (req, res) => {
  try {
    const { productId, quantity, customerInfo } = req.body;
    
    // Obtener información del producto del ERP
    const erpUrl = process.env.ERP_URL || 'http://localhost:4000';
    const recipesRes = await fetch(`${erpUrl}/api/recipes`);
    const recipes = await recipesRes.json();
    
    // Buscar la receta por nombre (productId viene como texto desde el selector del frontend)
    let product = recipes.find(r => r.name === productId || r.websiteCode === productId);
    
    if (!product) {
      // Si el producto no existe en el ERP, lo creamos dinámicamente con precios estimados
      // basados en los hardcoded del frontend para evitar que falle
      let defaultPrice = 0;
      if (productId === 'Tazones') defaultPrice = 4000;
      else if (productId === 'Llaveros') defaultPrice = 2500;
      else if (productId === 'Termos') defaultPrice = 15000;
      else if (productId === 'CuadrosMetal') defaultPrice = 25000;
      else if (productId === 'Impresion3D') defaultPrice = 12000;
      
      try {
        const createRes = await fetch(`${erpUrl}/api/recipes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: productId,
            websiteCode: productId,
            minPrice: defaultPrice,
            salePrice: defaultPrice,
            maxPrice: defaultPrice,
            items: []
          })
        });
        if (createRes.ok) {
          product = await createRes.json();
        } else {
          // Fallback manual si falla la creación (ej. ruta no existe)
          product = { id: 1, name: productId, salePrice: defaultPrice };
        }
      } catch(e) {
        product = { id: 1, name: productId, salePrice: defaultPrice };
      }
    }

    const basePrice = product.salePrice > 0 ? product.salePrice : (product.minPrice || 0);
    let discountPercent = 0;

    // Reglas de descuento por volumen corporativo
    if (quantity >= 10 && quantity < 50) {
      discountPercent = 10;
    } else if (quantity >= 50 && quantity < 100) {
      discountPercent = 20;
    } else if (quantity >= 100) {
      discountPercent = 30;
    }

    const discountAmount = (basePrice * quantity) * (discountPercent / 100);
    const subtotal = basePrice * quantity;
    const finalTotal = subtotal - discountAmount;

    // Opcional: Registrar la cotización en el ERP si viene con customerInfo
    if (customerInfo && customerInfo.email) {
      const salePayload = {
        clientName: `${customerInfo.name} (${customerInfo.email}) - Empresa: ${customerInfo.company}`,
        customerEmail: customerInfo.email,
        status: 'QUOTE', // Guarda como cotización pendiente
        discount: discountAmount,
        items: [{ recipeId: product.id, quantity, unitPrice: basePrice }]
      };

      try {
        await fetch(`${erpUrl}/api/sales`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salePayload)
        });
      } catch (erpError) {
        console.error("No se pudo guardar la cotización en el ERP:", erpError);
        // Continuamos igual para devolverle el cálculo al cliente
      }
    }

    res.json({
      productName: product.name,
      basePrice,
      quantity,
      subtotal,
      discountPercent,
      discountAmount,
      finalTotal,
      message: customerInfo ? 'Cotización enviada exitosamente.' : 'Cálculo realizado.'
    });

  } catch (error) {
    console.error('Error in /api/b2b-quote:', error.message);
    res.status(500).json({ error: 'Error interno procesando cotización' });
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
