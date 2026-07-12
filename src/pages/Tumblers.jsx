import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CupSoda, ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';
import { Mockup2DViewer } from '../components/Mockup2DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function Tumblers() {
    useSEO({
        title: 'Tumblers Térmicos Grabados | Sagason SpA',
        description: 'Tumblers y vasos térmicos grabados en láser con tu nombre o diseño. Mantén tus bebidas frías o calientes por horas con estilo premium.',
        keywords: 'tumbler personalizado, vaso termico grabado, regalo tumbler, grabado laser metal, Sagason, Chile',
        canonicalPath: '/tumblers'
    });

    const [customText, setCustomText] = useState('');
    const [category, setCategory] = useState('Personalización & Ambiente');
    const [size, setSize] = useState('20 oz');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [totalPrice, setTotalPrice] = useState(19990);

    const CATEGORIES = [
        'Personalización & Ambiente',
        'Videojuegos (Gaming)',
        'Películas / Series',
        'Deportes',
        'Empresas',
        'Foto Original',
        'Otro'
    ];
    
    const SIZES = ['20 oz', '30 oz', 'Otro'];

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            alert('Redirigiendo a la pasarela de pago seguro...');
            setIsCheckingOut(false);
        }, 1500);
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>ESTILO EN MOVIMIENTO</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Vasos Térmicos <span className="text-gradient">Premium</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Doble pared de acero inoxidable. Mantén tu café hirviendo o tu bebida helada durante todo el día, en un vaso grabado permanentemente con tecnología láser.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CupSoda size={24} color="var(--color-primary)" />
                                    Graba tu Tumbler
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Categoría / Temática</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Capacidad</label>
                                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Texto a Grabar</label>
                                    <input 
                                        type="text" 
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        placeholder="Ej: Tu Nombre o Frase..."
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}
                                    />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '5px', display: 'block' }}>El láser removerá la pintura exterior, revelando el acero inoxidable plateado brillante.</span>
                                </div>

                                <CheckoutExtras 
                                    basePrice={19990} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || !customText}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem', opacity: (!customText && !isCheckingOut) ? 0.5 : 1 }}
                                >
                                    {isCheckingOut ? 'Cargando...' : <>Comprar Ahora <ArrowRight size={20} /></>}
                                </button>
                                {!customText && <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#ff4d4f', marginTop: '1rem' }}>Escribe un texto para habilitar la compra.</p>}
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Efecto de Grabado</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Simulación 2D de diseño para el área cilíndrica.</p>
                            
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Mockup2DViewer product="tumblers" fileUrl={null} text={customText} />
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                    <Thermometer size={24} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem' }}>Aislamiento Extremo</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Acero 18/8 con vacío entre paredes. No transpira por fuera sin importar cuán fría esté la bebida.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="TUMBLERS" />
                </motion.div>
            </section>
        </div>
    );
}
