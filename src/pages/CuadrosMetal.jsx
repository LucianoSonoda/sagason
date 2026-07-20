import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, ShieldCheck, Sun, Droplets } from 'lucide-react';
import { Universal3DViewer } from '../components/Universal3DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function CuadrosMetal() {
    useSEO({
        title: 'Cuadros de Metal en Alta Definición | Sagason SpA',
        description: 'Decora tus espacios con fotografías y arte en cuadros de aluminio HD. Resistentes al agua y rayos UV. Colores vibrantes que duran toda la vida.',
        keywords: 'cuadros de metal, impresion aluminio, fotos en metal, decoracion, cuadros resistentes, Sagason',
        canonicalPath: '/cuadros-metal-hd'
    });

    const [category, setCategory] = useState('Personalización & Ambiente');
    const [size, setSize] = useState('10x15 cm');
    const [totalPrice, setTotalPrice] = useState(14990);
    const [checkoutData, setCheckoutData] = useState({});
    const { addToCart, setIsDrawerOpen } = useCart();

    const CATEGORIES = [
        'Personalización & Ambiente',
        'Videojuegos (Gaming)',
        'Películas / Series',
        'Deportes',
        'Empresas',
        'Foto Original',
        'Otro'
    ];
    
    const SIZES = ['10x15 cm', '20x28 cm', 'Personalizado'];

    const handleAddToCart = () => {
        const cartItem = {
            productId: Date.now().toString(),
            name: 'Cuadro de Metal HD', 
            price: totalPrice,
            quantity: 1,
            options: checkoutData || {}
        };
        addToCart(cartItem);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setIsDrawerOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={containerVariants}
                    className="glass-panel"
                    style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>ARTE Y DURABILIDAD</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Metal Que <span className="text-gradient">Dura Toda la Vida</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Olvídate del papel y el cartón. Nuestros cuadros sublimados en aluminio aeronáutico ofrecen colores hiperrealistas, resistencia a la humedad y una presentación premium para tu hogar o galería.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <ImageIcon size={24} color="var(--color-primary)" />
                                    Elige tu Formato
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Categoría / Temática</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Tamaño</label>
                                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '2rem', background: 'rgba(37, 99, 235, 0.05)', padding: '1rem', borderRadius: '8px' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '10px' }}>Si tu fotografía en alta resolución es mayor a 25MB, puedes enviarla vía correo o compartir un enlace para bajarla en las instrucciones al confirmar el carrito. Es <strong>obligatorio</strong> adjuntar al menos una imagen de muestra reducida allí junto a la solicitud.</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                        <Sun size={20} color="var(--color-primary)" />
                                        <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Filtro Anti-UV</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                        <Droplets size={20} color="var(--color-primary)" />
                                        <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Resistente al Agua</span>
                                    </div>
                                </div>

                                <CheckoutExtras 
                                    basePrice={14990} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                    onDataChange={(data) => setCheckoutData(data)}
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px' }}
                                    >
                                        Comprar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Efecto de Acabado Metálico</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Los blancos de la imagen tomarán el sutil reflejo del aluminio, creando un efecto luminiscente único.</p>
                            
                            <Universal3DViewer 
                                product="cuadro" 
                                category="metal"
                                size={size}
                                name="ARTE HD"
                            />

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <ShieldCheck size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Montaje Flotante</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Todos nuestros cuadros incluyen un sistema de anclaje oculto, separando la pieza de la pared para un look ultra-moderno.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="CUADRO HD" />
                </motion.div>
            </section>
        </div>
    );
}
