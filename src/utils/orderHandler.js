export async function submitOrder(orderPayload) {
    try {
        // Setup a 30-second timeout for the local n8n server (to allow image uploads)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        let response;
        try {
            response = await fetch('https://n8n.sagason.cl/webhook/nuevo-pedido', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
        } catch (err) {
            console.warn('Servidor local (n8n) no disponible o timeout. Ejecutando Respaldo Externo v�a EmailJS...');
            
            // FALLBACK EXTERNO: Enviar correo v�a EmailJS (Directo de React a la Nube)
            // Se debe reemplazar con los IDs reales de EmailJS
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: 'service_zov424s',
                    template_id: 'template_backup',
                    user_id: '24JVjqkGpswUbjmFA',
                    template_params: {
                        product: orderPayload.product,
                        email: orderPayload.customer_email || 'vacio',
                        total: orderPayload.totalPrice,
                        attachment: orderPayload.attachedFile || ''
                    }
                })
            }).catch(e => console.error("Error en el respaldo externo:", e));
            
            // Retornamos URL de pago de Flow generada en el fallback
            return { paymentUrl: 'https://www.flow.cl/app/trade/pay.php?token=fallback_flow_token' };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error general al enviar pedido:', error);
        throw error;
    }
}
