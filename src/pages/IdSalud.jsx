import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Heart, Activity, CheckCircle, FileText } from 'lucide-react';
import { Universal3DViewer } from '../components/Universal3DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';

import '../styles/Home.css';

export default function IdSalud() {
    useSEO({
        title: 'ID Salud y Emergencias | Sagason SpA',
        description: 'Protege tu historial médico y el de tus seres queridos. Placas y tarjetas con código QR para emergencias médicas, alzhéimer, alergias y condiciones crónicas.',
        keywords: 'identificacion medica, id salud, pulsera qr emergencia, placa alzhéimer, Sagason, Chile',
        canonicalPath: '/id-salud'
    });

    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('Salud Impresa');
    const [size, setSize] = useState('Pulsera / Brazalete');
    
    const [totalPrice, setTotalPrice] = useState(8990);
    const { addToCart, setIsDrawerOpen } = useCart();
    const [checkoutData, setCheckoutData] = useState({});

    const CATEGORIES = ['Salud Impresa', 'Ficha en Código QR', 'Ficha Editable en Línea'];
    const SIZES = ['Pulsera / Brazalete', 'Medallón / Tag', 'Tarjeta de Cartera', 'Formato Personalizado'];

    const handleAddToCart = () => {
        const cartItem = {
            productId: Date.now().toString(),
            name: 'ID Salud: ' + (userName || 'Sin nombre'), 
            price: totalPrice || 0,
            quantity: 1,
            options: typeof checkoutData !== 'undefined' ? checkoutData : {}
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>SEGURIDAD VITAL</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>La Información Que <span className="text-gradient">Salva Vidas</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Diseñado para adultos mayores, personas con condiciones crónicas o alergias severas. Un escaneo rápido brinda a los paramédicos o transeúntes el historial médico vital sin comprometer la privacidad.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Activity size={24} color="var(--color-primary)" />
                                    Configura la Identificación
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Nombre del Usuario</label>
                                    <input 
                                        type="text" 
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Tipo de Ficha</label>
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

                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '0.5rem' }}>Beneficios Exclusivos:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><CheckCircle size={16} color="var(--color-primary)" /> Control de Datos Clínicos Online</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><CheckCircle size={16} color="var(--color-primary)" /> Contactos de Emergencia (SOS)</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><CheckCircle size={16} color="var(--color-primary)" /> Modo "Solo Emergencias" (Privacidad)</li>
                                    </ul>
                                </div>

                                <CheckoutExtras 
                                    basePrice={8990} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                    onDataChange={(data) => setCheckoutData(data)}
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
                                </div>
                                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '1rem' }}>
                                    Pago directo vía Webpay / Flow
                                </p>
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Vista Previa en Tiempo Real</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Formato Medallón de Acero.</p>
                            
                            <Universal3DViewer 
                                product="id-salud" 
                                category="metal"
                                size={size}
                                name={userName || 'INFO MÉDICA'}
                            />

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <FileText size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Historial Centralizado</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Actualiza medicamentos, alergias y tipo de sangre desde el portal, sin costo extra ni suscripciones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="ID SALUD" />
                </motion.div>
            </section>
        </div>
    );
}


