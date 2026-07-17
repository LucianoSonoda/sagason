import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Universal3DViewer } from '../components/Universal3DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import { submitOrder } from '../utils/orderHandler';
import '../styles/Home.css';

export default function Llaveros() {
    useSEO({
        title: 'Llaveros Personalizados Metálicos | Sagason SpA',
        description: 'Llaveros de metal grabados con láser o sublimados. Personalízalos con tu nombre, logo o patente de vehículo. Alta resistencia y acabado premium.',
        keywords: 'llaveros personalizados, llaveros metal, grabado laser, patente vehiculo, Sagason, Chile',
        canonicalPath: '/llaveros'
    });

    const [customText, setCustomText] = useState('');
    const [category, setCategory] = useState('Personalización & Ambiente');
    const [size, setSize] = useState('Rectangular');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [totalPrice, setTotalPrice] = useState(4990);
    const [checkoutData, setCheckoutData] = useState({});

    const CATEGORIES = [
        'Personalización & Ambiente',
        'Videojuegos (Gaming)',
        'Películas / Series',
        'Deportes',
        'Empresas',
        'Foto Original',
        'Otro'
    ];
    
    const SIZES = ['Redondo', 'Cuadrado', 'Rectangular', 'Corazón', 'Otro'];

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const orderPayload = {
                product: 'Llavero Metálico ' + (customText || 'Sin texto'),
                category,
                size,
                basePrice: 4990,
                ...checkoutData
            };

                        const data = await submitOrder(orderPayload);
            
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('�Pedido registrado! (Pago pendiente)');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor.');
        } finally {
            setIsCheckingOut(false);
        }
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>ACCESORIOS ÚNICOS</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Llaveros Que <span className="text-gradient">Destacan</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Convierte tus llaves en una declaración de estilo. Nuestros llaveros metálicos son grabados con láser de alta precisión o sublimados en colores vibrantes, ideales para tu vehículo o como un regalo significativo.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Key size={24} color="var(--color-primary)" />
                                    Personaliza tu Llavero
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Texto o Nombre</label>
                                    <input 
                                        type="text" 
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        placeholder="Ej: Patente, Nombre, Iniciales..."
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Categoría / Diseño</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Formato</label>
                                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <CheckoutExtras 
                                    basePrice={4990} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                    onDataChange={(data) => setCheckoutData(data)}
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
                                >
                                    {isCheckingOut ? 'Cargando...' : <>Comprar Ahora <ArrowRight size={20} /></>}
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '1rem' }}>
                                    Pagos procesados por Webpay / Flow
                                </p>
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Vista Previa en Tiempo Real</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Previsualización del grabado láser sobre metal.</p>
                            
                            <Universal3DViewer 
                                product="llaveros" 
                                category="metal"
                                size={size.toLowerCase()}
                                name={customText || 'TU TEXTO'}
                            />

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <ShieldCheck size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Metal de Grado Premium</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Acero de alta resistencia que soporta el roce constante con otras llaves sin perder el diseño.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="LLAVEROS" />
                </motion.div>
            </section>
        </div>
    );
}


