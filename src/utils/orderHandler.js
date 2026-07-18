export async function submitOrder(orderPayload) {
    // Validate mandatory contact fields
    if (!orderPayload.customer_name || !orderPayload.customer_rut || !orderPayload.customer_email || !orderPayload.customer_address || !orderPayload.customer_phone) {
        alert("Por favor completa todos los datos de contacto obligatorios (Nombre, RUT, Correo, Direccin y Telfono) en la seccin de Extras antes de comprar.");
        throw new Error("Faltan datos de contacto obligatorios");
    }

        // Inyectar color de categoría para Vikunja basado en el producto
    const productLower = (orderPayload.product || '').toLowerCase();
    let hexColor = '#808080'; // Gris por defecto
    if (productLower.includes('rompecabezas')) hexColor = '#1e6fd9'; // Azul
    else if (productLower.includes('taz')) hexColor = '#f44336'; // Rojo
    else if (productLower.includes('tumbler')) hexColor = '#9c27b0'; // Morado
    else if (productLower.includes('llavero')) hexColor = '#ff9800'; // Naranja
    else if (productLower.includes('mascota')) hexColor = '#4caf50'; // Verde
    else if (productLower.includes('salud')) hexColor = '#e91e63'; // Rosado
    else if (productLower.includes('cuadro')) hexColor = '#607d8b'; // Azul grisáceo
    else if (productLower.includes('3d')) hexColor = '#00bcd4'; // Cyan

    orderPayload.hexColor = hexColor;

    try {
        // Setup a 30-second timeout for the local n8n server (to allow image uploads)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        let response;
            // Inyectar color de categoría para Vikunja basado en el producto
    const productLower = (orderPayload.product || '').toLowerCase();
    let hexColor = '#808080'; // Gris por defecto
    if (productLower.includes('rompecabezas')) hexColor = '#1e6fd9'; // Azul
    else if (productLower.includes('taz')) hexColor = '#f44336'; // Rojo
    else if (productLower.includes('tumbler')) hexColor = '#9c27b0'; // Morado
    else if (productLower.includes('llavero')) hexColor = '#ff9800'; // Naranja
    else if (productLower.includes('mascota')) hexColor = '#4caf50'; // Verde
    else if (productLower.includes('salud')) hexColor = '#e91e63'; // Rosado
    else if (productLower.includes('cuadro')) hexColor = '#607d8b'; // Azul grisáceo
    else if (productLower.includes('3d')) hexColor = '#00bcd4'; // Cyan

    orderPayload.hexColor = hexColor;

    try {
            response = await fetch('https://n8n.sagason.cl/webhook/nuevo-pedido', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
        } catch (err) {
            console.warn('Fallo el envio inicial (posible timeout o imagen muy pesada). Intentando sin imagen...');
            
            let retrySuccess = false;
            if (orderPayload.attachedFile) {
                const fallbackPayload = { ...orderPayload };
                delete fallbackPayload.attachedFile;
                delete fallbackPayload.attachedFileName;
                fallbackPayload.customInstructions = (fallbackPayload.customInstructions || "") + "\n\n[SISTEMA]: El cliente subio una imagen, pero el servidor la rechazo por ser demasiado pesada. Contactalo (via WhatsApp o Correo) para solicitarle la imagen original.";
                
                    // Inyectar color de categoría para Vikunja basado en el producto
    const productLower = (orderPayload.product || '').toLowerCase();
    let hexColor = '#808080'; // Gris por defecto
    if (productLower.includes('rompecabezas')) hexColor = '#1e6fd9'; // Azul
    else if (productLower.includes('taz')) hexColor = '#f44336'; // Rojo
    else if (productLower.includes('tumbler')) hexColor = '#9c27b0'; // Morado
    else if (productLower.includes('llavero')) hexColor = '#ff9800'; // Naranja
    else if (productLower.includes('mascota')) hexColor = '#4caf50'; // Verde
    else if (productLower.includes('salud')) hexColor = '#e91e63'; // Rosado
    else if (productLower.includes('cuadro')) hexColor = '#607d8b'; // Azul grisáceo
    else if (productLower.includes('3d')) hexColor = '#00bcd4'; // Cyan

    orderPayload.hexColor = hexColor;

    try {
                    const controller2 = new AbortController();
                    const timeoutId2 = setTimeout(() => controller2.abort(), 10000);
                    response = await fetch('https://n8n.sagason.cl/webhook/nuevo-pedido', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(fallbackPayload),
                        signal: controller2.signal
                    });
                    clearTimeout(timeoutId2);
                    retrySuccess = true;
                } catch (retryErr) {
                    console.warn('Fallo el reintento sin imagen. Ejecutando Respaldo Externo...');
                }
            }

            if (!retrySuccess) {
                // FALLBACK EXTERNO: Enviar correo via EmailJS (Directo de React a la Nube)
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
                            attachment: 'Imagen descartada por tamaño o error de red.'
                        }
                    })
                }).catch(e => console.error("Error en el respaldo externo:", e));
                
                return { paymentUrl: 'https://www.flow.cl/app/trade/pay.php?token=fallback_flow_token' };
            }
        }

        let data = {};
        const text = await response.text();
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.warn("Respuesta no JSON del webhook:", text);
        }
        return data;
    } catch (error) {
        console.error('Error general al enviar pedido:', error);
        throw error;
    }
}


