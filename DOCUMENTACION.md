# Documentación del Sitio Web Sagason SpA

Este documento resume las principales características, integraciones y flujos de trabajo implementados en el e-commerce de Sagason SpA.

## 1. Arquitectura y Tecnologías
- **Frontend:** React (Vite)
- **Estilos:** Vanilla CSS (sin Tailwind)
- **Animaciones:** Framer Motion y Lucide React para íconos.
- **Automatización & Backend:** n8n (self-hosted en `n8n.sagason.cl`)
- **Pasarela de Pagos:** Flow.cl

## 2. Flujo de Checkout y Pasarela de Pagos (Flow)
El carrito de compras ("Cart Drawer") recolecta la información del cliente y los productos, y la envía a un Webhook central en n8n.

### Proceso Paso a Paso:
1. El usuario completa sus datos (Nombre, RUT, Correo, Teléfono, Dirección) y hace clic en "Pagar Ahora".
2. `orderHandler.js` agrupa los productos del carrito y la información del cliente.
3. Se hace un `POST` al webhook de n8n: `https://n8n.sagason.cl/webhook/nuevo-pedido`.
4. **En n8n:**
   - Se recibe el JSON del pedido.
   - Un nodo de **"Code in JavaScript"** genera una firma (HMAC) requerida por Flow.cl utilizando las llaves de API.
   - *Importante:* El nodo de JavaScript utiliza variables dinámicas del cliente (`$json.customer_email` y `$json.totalPrice`) para registrar el pago en Flow. (Anteriormente fallaba por utilizar un correo estático de prueba `juan.perez@example.com` que el anti-fraude de Flow bloqueaba).
   - Un nodo **"HTTP Request"** envía los datos firmados a la API de Flow para generar la transacción.
   - Flow devuelve un token de pago.
   - n8n responde al frontend con un JSON que contiene `paymentUrl` (ej. `https://www.flow.cl/app/trade/pay.php?token=...`).
5. El frontend recibe la URL y redirige automáticamente al usuario a la pasarela de pagos de Flow.

*(Si n8n falla o no responde con una URL, el sistema tiene una validación de seguridad que envía al usuario temporalmente a la página de éxito/fallback sin cobrar, para no perder la intención de compra).*

## 3. Sistema de Subida de Archivos (Drag & Drop)
Se estandarizó la carga de imágenes y diseños para todos los productos personalizables (Cuadros de Metal, Rompecabezas, etc.).

- **Componente Central:** `CheckoutExtras.jsx`
- **Funcionamiento:** Todos los productos utilizan el componente `CheckoutExtras` para inyectar opciones de "Instrucciones Adicionales", "Arte con IA", "Empaque de Regalo" y la **Subida de Fotografía**.
- La antigua carga de archivos tipo input nativo ("Adjuntar Imagen/Diseño") fue reemplazada por una interfaz moderna de arrastrar y soltar ("Sube tu Fotografía") con el ícono de `Upload`.
- **Compresión de Imágenes:** Antes de adjuntar la imagen al carrito, esta pasa por `imageCompressor.js` para ser convertida a Base64 y reducir su peso, optimizando la velocidad del sitio.
- **Integración Visual:** Al subir una imagen, `CheckoutExtras` emite el `attachedFile` en Base64, el cual es detectado automáticamente por productos como el "Rompecabezas" para generar una simulación/mockup 2D en vivo de cómo se verán las piezas cortadas sobre la foto.

## 4. Correcciones Críticas Recientes
- **Impresión 3D:** Se corrigió un error de estado (`isSubmitting` no definido) que causaba que la página colapsara en blanco ("White screen of death").
- **Robustez del Webhook:** Se agregó manejo de excepciones en `orderHandler.js` para los casos en los que n8n devuelva texto plano o vacío en lugar de un JSON válido, evitando la caída de la aplicación.
