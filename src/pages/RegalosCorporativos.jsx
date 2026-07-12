import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Package, Truck, Award } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function RegalosCorporativos() {
    useSEO({
        title: 'Regalos Corporativos y Merchandising Premium | Sagason SpA',
        description: 'Merchandising de alta gama para empresas. Posavasos, mousepads y grabados láser corporativos. Cotiza volumen con precios mayoristas.',
        keywords: 'regalos corporativos, merchandising empresas, regalos premium, Sagason B2B',
        canonicalPath: '/regalos-corporativos'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert('¡Solicitud enviada! Nuestro equipo comercial te contactará en menos de 2 horas.');
            setIsSubmitting(false);
            e.target.reset();
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>SAGASON B2B</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Merchandising Que <span className="text-gradient">No Termina en la Basura</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Olvídate del lápiz plástico. Regala a tus clientes y colaboradores piezas de metal sublimado, posavasos texturizados y mousepads de alto calibre que usarán todos los días.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
                        {/* Benefits */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                    <Award size={28} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem', fontSize: '1.2rem' }}>Calidad Tecnológica</h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Producimos usando sublimación 4K y grabado láser de precisión. Tu marca se verá impecable.</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                    <Package size={28} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem', fontSize: '1.2rem' }}>Volumen Escalonado</h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Precios preferenciales para compras sobre 50 unidades. Combinamos formatos y diseños sin costo extra.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                    <Truck size={28} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem', fontSize: '1.2rem' }}>Entregas Express</h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>¿Evento corporativo en 7 días? Nuestra fábrica en Chile responde a tiempos ajustados que las importaciones no logran.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Briefcase size={24} color="var(--color-primary)" />
                                Cotiza para tu Empresa
                            </h3>
                            
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Empresa</label>
                                    <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Email Corporativo</label>
                                        <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Teléfono</label>
                                        <input type="tel" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>¿Qué necesitas y en qué cantidad?</label>
                                    <textarea rows="4" required placeholder="Ej: 100 Mousepads y 50 Llaveros grabados..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}></textarea>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem', marginTop: '1rem' }}
                                >
                                    {isSubmitting ? 'Enviando...' : <>Solicitar Presupuesto <ArrowRight size={20} /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
