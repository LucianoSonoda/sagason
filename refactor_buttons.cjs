const fs = require('fs');
const path = require('path');

const dir = 'f:/Proyectos/SAGASON SPA/SitioWeb/sagason/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Add import useCart if not exists
    if (!content.includes('useCart')) {
        content = content.replace(/import React[^;]*;/, "$&\nimport { useCart } from '../context/CartContext';");
    }
    
    // Add useCart hook inside component (after useState)
    if (!content.includes('const { addToCart, setIsDrawerOpen } = useCart();')) {
        content = content.replace(/(const \[totalPrice, setTotalPrice\] = useState\([^)]+\);)/, "$1\n    const { addToCart, setIsDrawerOpen } = useCart();");
    }

    // Extract product name for cart
    const payloadMatch = content.match(/const orderPayload = (\{[\s\S]*?\});/);
    let productName = 'Producto Sagason';
    if (payloadMatch) {
        const productMatch = payloadMatch[1].match(/product:\s*([^,]+),/);
        if (productMatch) {
            productName = productMatch[1];
        }
    }

    // The robust way to replace handleCheckout block:
    // It starts with `const handleCheckout` and ends before `const containerVariants`
    const replacement = `const handleAddToCart = () => {
        const cartItem = {
            productId: Date.now().toString(),
            name: ${productName}, 
            price: totalPrice,
            quantity: 1,
            options: checkoutData || {}
        };
        addToCart(cartItem);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setIsDrawerOpen(true);
    };`;

    content = content.replace(/const handleCheckout = async \(\) => \{[\s\S]*?const containerVariants =/g, replacement + '\n\n    const containerVariants =');

    // Replace button
    const buttonRegex = /<button[^>]*onClick=\{handleCheckout\}[^>]*>[\s\S]*?<\/button>/;
    const newButtons = `<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button 
                                        onClick={handleAddToCart}
                                        className="btn btn-secondary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', border: '1px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', borderRadius: '8px' }}
                                    >
                                        Agregar al Carrito
                                    </button>
                                    <button 
                                        onClick={handleBuyNow}
                                        className="btn btn-primary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px', color: 'white', background: 'var(--color-primary)', border: 'none' }}
                                    >
                                        Comprar Ahora
                                    </button>
                                </div>`;
    
    content = content.replace(buttonRegex, newButtons);
    
    // Remove isCheckingOut state and submitOrder
    content = content.replace(/const \[isCheckingOut, setIsCheckingOut\] = useState\(false\);\n?/, '');
    content = content.replace(/import \{ submitOrder \} from '\.\.\/utils\/orderHandler';\n?/, '');

    // ALSO update CuadrosMetal specific text
    if (file === 'CuadrosMetal.jsx') {
        content = content.replace(
            'Podrás subir tu fotografía en alta resolución en el siguiente paso, luego de confirmar tu pago seguro.',
            'Si tu fotografía en alta resolución es mayor a 25MB, puedes enviarla vía correo o compartir un enlace para bajarla en las instrucciones. Es <strong>obligatorio</strong> adjuntar al menos una imagen de muestra reducida aquí junto a la solicitud.'
        );
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated', file);
});
