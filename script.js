const API_URL = 'https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod/waitlist';

document.getElementById('s4k-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const btn = document.getElementById('submit-btn');
    const msg = document.getElementById('status-msg');

    btn.disabled = true;
    btn.innerText = 'Procesando...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            msg.innerHTML = "<p style='color: #2ecc71;'>¡Kansha! Registro exitoso.</p>";
            document.getElementById('email').value = '';
            
            // Push a GTM dataLayer para Ciencia de Datos
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'social_waitlist_signup',
                'pilar': 'Kansha'
            });
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (err) {
        msg.innerHTML = "<p style='color: #e74c3c;'>Error de conexión. Intenta de nuevo.</p>";
    } finally {
        btn.disabled = false;
        btn.innerText = 'Avisarme al abrir';
    }
});
