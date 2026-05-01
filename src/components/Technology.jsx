import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Diamond, Zap, Cloud, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Technology() {
    return (
        <div className="technology-page" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-header"
                >
                    <span className="section-label">TECNOLOGÍA SAGASON</span>
                    <h1 className="section-title">LA DIFERENCIACIÓN <span className="text-primary">TÉCNICA 4K</span></h1>
                    <p className="section-subtitle">En un mercado saturado de soluciones genéricas, priorizamos la resiliencia del dato y la protección del vínculo.</p>
                </motion.div>

                <div className="features-stack" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '4rem' }}>
                    
                    {/* DIFERENCIAL 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                        style={{ padding: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
                    >
                        <div style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '15px', height: 'fit-content' }}>
                            <Cloud size={40} className="text-primary" />
                        </div>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>1. INFRAESTRUCTURA RESILIENTE (KENSHIN)</h2>
                            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>Nuestro sistema opera sobre una arquitectura de nivel corporativo para garantizar que el vínculo nunca se rompa:</p>
                            <ul style={{ color: 'var(--color-muted)', listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', gap: '12px' }}>
                                    <Zap size={18} className="text-primary" style={{ flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>Disponibilidad 24/7:</strong> Desplegado en la nube con redundancia global. Si la red falla, el vínculo (Kizuna) permanece activo.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px' }}>
                                    <Target size={18} className="text-primary" style={{ flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>Grabado de Alta Precisión:</strong> Utilizamos tecnología de Láser de Fibra (1064nm) para lograr una modulación multidimensional en acero inoxidable.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* DIFERENCIAL 2 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                        style={{ padding: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}
                    >
                        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '15px', height: 'fit-content' }}>
                            <Shield size={40} style={{ color: '#10b981' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>2. PRIVACIDAD POR DISEÑO (TRADE-OFF)</h2>
                            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>Nuestra posición competitiva se define por lo que decidimos no hacer para proteger tu intimidad:</p>
                            <ul style={{ color: 'var(--color-muted)', listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', gap: '12px' }}>
                                    <Shield size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>No somos una Red Social:</strong> No recolectamos metadatos para publicidad ni obligamos al registro de perfiles públicos.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px' }}>
                                    <Shield size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>Seguridad Blindada:</strong> Los datos existen con el único fin del reencuentro. Aplicamos principios de baja entropía.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* DIFERENCIAL 3 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                        style={{ padding: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
                    >
                        <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '15px', height: 'fit-content' }}>
                            <Diamond size={40} style={{ color: '#a855f7' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>3. MODELO DE VALOR ÚNICO (KANSHA)</h2>
                            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>Rompemos el ciclo del SaaS tradicional para ofrecer una protección real:</p>
                            <ul style={{ color: 'var(--color-muted)', listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', gap: '12px' }}>
                                    <Diamond size={18} style={{ color: '#a855f7', flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>Sin Suscripciones Obligatorias:</strong> Creemos en la gratitud mutua. El plan Free es renovable anualmente sin costo.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px' }}>
                                    <Diamond size={18} style={{ color: '#a855f7', flexShrink: 0, marginTop: '4px' }} />
                                    <span><strong>Acceso Universal:</strong> El rescatista no necesita aplicaciones. El flujo de comunicación es directo y eficiente.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>

                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>¿LISTO PARA INMORTALIZAR TUS AVENTURAS?</h3>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/#custom" className="btn btn-primary glow">Personalizar Ahora</Link>
                            <Link to="/como-funciona" className="btn btn-glass">Ver Guía de Inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
