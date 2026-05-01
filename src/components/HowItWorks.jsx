import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HowItWorks() {
    return (
        <div className="how-it-works-page" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-header"
                >
                    <span className="section-label">GUÍA DE INICIO</span>
                    <h1 className="section-title">ACTIVA TU PROTECCIÓN <span className="text-primary">SAGASON</span></h1>
                    <p className="section-subtitle">Configura tus tags inteligentes en minutos y asegura el retorno de lo que más quieres.</p>
                </motion.div>

                <div className="trust-section glass-panel glow-card" style={{ marginBottom: '4rem', padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <img src="/sagason-symbol.png" alt="Símbolo Sagason" style={{ width: '80px', height: '80px', filter: 'drop-shadow(0 0 15px var(--color-primary))' }} />
                        <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>AL VER ESTE SÍMBOLO, PUEDES <span className="text-primary">CONFIAR</span></h2>
                    </div>
                    <p style={{ color: 'var(--color-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        El símbolo Sagason identifica una placa de identificación segura y verificada. Cuando lo veas en un collar, mochila o accesorio, <strong>escanear el QR es completamente seguro</strong> — solo muestra información de contacto para ayudar a quien lo necesita.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                        {['Sin datos personales expuestos', 'Sin instalación de apps', 'Solo abre una página web'].map(t => (
                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                                <CheckCircle2 size={16} /> {t}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { num: 1, title: 'Acceder al Sitio', desc: 'Ingresa a sagason.cl desde el navegador de tu teléfono o computador.' },
                        { num: 2, title: 'Entrar al Panel', desc: 'En la página principal, presiona el botón "Panel de Control" para acceder a tu cuenta.' },
                        { num: 3, title: 'Iniciar Sesión', desc: 'Realiza tu login con tu cuenta de Google. Seguridad garantizada sin contraseñas extras.' },
                        { num: 4, title: 'Vincular tu Placa', desc: 'Ingresa el ID de la placa (XXXX-XXXX) y el PIN de activación recibido por correo.' },
                        { num: 5, title: 'Administrar', desc: 'Configura nombres, teléfonos de contacto y mensajes de agradecimiento en cualquier momento.' },
                        { num: 6, title: 'Planes y Escaneos', desc: 'Comienzas con el Plan Free (5 escaneos/año). Puedes mejorar a Basic (30) o Advanced (60) en el panel.' },
                        { num: 7, title: 'Datos de Contacto', desc: 'Modifica correos y teléfonos de notificación sin afectar el QR físico de tu placa.' },
                        { num: 8, title: 'Mensaje de Rescate', desc: 'Configura un mensaje que el rescatista verá: ideal para alergias, tipo de sangre o medicamentos.' },
                    ].map(step => (
                        <motion.div 
                            key={step.num}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{ padding: '2rem', position: 'relative' }}
                        >
                            <div style={{ position: 'absolute', top: '-15px', left: '20px', width: '35px', height: '35px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 0 15px var(--color-primary)' }}>
                                {step.num}
                            </div>
                            <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{step.title}</h3>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid #f59e0b' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <AlertTriangle color="#f59e0b" size={24} />
                            <div>
                                <h3 style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>INFORMACIÓN IMPORTANTE</h3>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}><strong>El tag no puede ser reemplazado ni transferido.</strong> Una vez vinculado a tu cuenta, no es posible asociarlo a otro usuario. Cuida bien tu ID y PIN de activación.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <a href="/dashboard.html" className="btn btn-primary glow" style={{ padding: '1rem 3rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        Ir al Panel de Control <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
