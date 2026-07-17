import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Printer, ArrowRight, Cog, Cuboid } from 'lucide-react';
import { Universal3DViewer } from '../components/Universal3DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import { submitOrder } from '../utils/orderHandler';
import '../styles/Home.css';

export default function Impresion3D() {
    useSEO({
        title: 'Servicio de Impresión 3D y Modelado | Sagason SpA',
        description: 'Impresión 3D en PLA y ABS. Fabricación de prototipos, piezas mecánicas y figuras decorativas a pedido.',
        keywords: 'impresion 3d, servicio impresion 3d, filamento PLA, piezas 3d, Sagason, Chile',
        canonicalPath: '/impresion-3d'
    });

    const [category, setCategory] = useState('1 Color');
    const [size, setSize] = useState('PLA');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutData, setCheckoutData] = useState({});

    const CATEGORIES = ['1 Color', '2 Colores', '3 Colores'];
    const SIZES = ['PLA', 'ABS', 'Ambos', 'Otro'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const orderPayload = {
                product: 'Cotización Impresión 3D',
                category,
                size,
                basePrice: 0,
                ...checkoutData
            };

                        const data = await submitOrder(orderPayload);
            
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('�Pedido registrado! (Pago pendiente)');
            }
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor.');
        } finally {
            setIsSubmitting(false);
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>MANUFACTURA ADITIVA</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Tus Ideas <span className="text-gradient">Hechas Realidad</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Desde prototipos industriales hasta figuras decorativas multicromáticas. Ofrecemos servicio de impresión 3D FDM en filamentos de alta resistencia.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator / Form */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Printer size={24} color="var(--color-primary)" />
                                    Cotiza tu Proyecto
                                </h3>
                                
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>¿Tienes el archivo 3D? (.stl, .obj)</label>
                                        <select required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                            <option value="si">Sí, tengo el archivo listo</option>
                                            <option value="no">No, necesito que lo diseñen</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Material / Aplicación</label>
                                        <select value={size} onChange={(e) => setSize(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Colores</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Descripción</label>
                                        <textarea required rows="4" placeholder="Describe el tamaño aproximado y el uso de la pieza..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}></textarea>
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Correo de Contacto</label>
                                        <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }} />
                                    </div>

                                    <CheckoutExtras 
                                        basePrice={0} 
                                        onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                        onDataChange={(data) => setCheckoutData(data)}
                                    />

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                                        <span style={{ fontSize: '1.2rem' }}>Cotización:</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>A convenir + ${totalPrice.toLocaleString('es-CL')}</span>
                                    </div>
                                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#ffb300', fontStyle: 'italic', textAlign: 'center' }}>
                                        * Nota: Dependiendo de la complejidad de la solicitud 3D, el precio final se informará por correo o la solicitud podría ser rechazada.
                                    </p>

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary" 
                                        style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem', marginTop: '1rem' }}
                                    >
                                        {isSubmitting ? 'Enviando...' : <>Solicitar Factibilidad <ArrowRight size={20} /></>}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Vista Previa Estructural</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Representación del mallado y extrusión por capas (FDM).</p>
                            
                            <Universal3DViewer 
                                product="impresion3d" 
                                category={size.toLowerCase()}
                                size="estandar"
                                name="MODELO 3D"
                            />

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Cog size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Repuestos a Medida</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Ideal para reponer engranajes, tapas o perillas plásticas descontinuadas por los fabricantes.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Cuboid size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Acabado Multicolor</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Capacidad de imprimir con transiciones de color en la misma pieza sin necesidad de pintura posterior.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="IMPRESIÓN 3D" />
                </motion.div>
            </section>
        </div>
    );
}


