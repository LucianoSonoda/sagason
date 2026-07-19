const fs = require('fs');
const path = require('path');

const dir = 'f:/Proyectos/SAGASON SPA/SitioWeb/sagason/src/pages';
const files = [
    'GaleriaArtistas.jsx',
    'IdMascotas.jsx',
    'IdSalud.jsx',
    'Impresion3D.jsx',
    'Llaveros.jsx',
    'RegalosCorporativos.jsx',
    'Rompecabezas.jsx',
    'Tags4K.jsx',
    'Tazones.jsx',
    'Tumblers.jsx'
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if it doesn't have a buy button
    if (!content.includes('Comprar Ahora') && !content.includes('handleCheckout') && !content.includes('handleSubmit')) {
        return;
    }

    // Add import useCart if not exists
    if (!content.includes('useCart')) {
        content = content.replace(/import React[^;]*;/, "$&\nimport { useCart } from '../context/CartContext';");
    }
    
    // Add useCart hook inside component (after useState)
    if (!content.includes('addToCart')) {
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

    const replacement = `const handleAddToCart = () => {
        const cartItem = {
            productId: Date.now().toString(),
            name: ${productName}, 
            price: totalPrice || 0,
            quantity: 1,
            options: typeof checkoutData !== 'undefined' ? checkoutData : {}
        };
        addToCart(cartItem);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setIsDrawerOpen(true);
    };`;

    if (file === 'Impresion3D.jsx') {
        // Impresion3D uses handleSubmit
        const submitReplacement = `const handleSubmit = async (e) => {
        e.preventDefault();
        const cartItem = {
            productId: Date.now().toString(),
            name: 'Cotización Impresión 3D',
            price: 0,
            quantity: 1,
            options: { category, size, ...(typeof checkoutData !== 'undefined' ? checkoutData : {}) }
        };
        addToCart(cartItem);
        setIsDrawerOpen(true);
        e.target.reset();
    };`;
        content = content.replace(/const handleSubmit = async \(\w+\) => \{[\s\S]*?const containerVariants =/g, submitReplacement + '\n\n    const containerVariants =');
    } else {
        content = content.replace(/const handleCheckout = async \(\) => \{[\s\S]*?const containerVariants =/g, replacement + '\n\n    const containerVariants =');
    }

    // Replace button
    const buttonRegex = /<button[^>]*onClick=\{handleCheckout\}[^>]*>[\s\S]*?<\/button>/;
    const newButtons = `<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button 
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="btn btn-secondary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', border: '1px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', borderRadius: '8px' }}
                                    >
                                        Agregar al Carrito
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="btn btn-primary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px', color: 'white', background: 'var(--color-primary)', border: 'none' }}
                                    >
                                        Comprar Ahora
                                    </button>
                                </div>`;
    
    if (file !== 'Impresion3D.jsx') {
        content = content.replace(buttonRegex, newButtons);
    }
    
    // Remove isCheckingOut state and submitOrder
    content = content.replace(/const \[isCheckingOut, setIsCheckingOut\] = useState\(false\);\n?/, '');
    content = content.replace(/import \{ submitOrder \} from '\.\.\/utils\/orderHandler';\n?/, '');

    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
});
