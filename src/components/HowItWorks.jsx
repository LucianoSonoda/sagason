import React from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    Smartphone, 
    UserCheck, 
    Settings, 
    ArrowRight, 
    ShieldCheck, 
    Zap,
    Lock,
    HelpCircle,
    Database,
    Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
    { 
        num: 1, 
        icon: <Smartphone className="text-primary" />,
        title: 'Acceder al Sitio', 
        desc: 'Ingresa a sagason.cl desde tu navegador móvil o escritorio. No necesitas descargar ninguna aplicación.' 
    },
    { 
        num: 2, 
        icon: <UserCheck style={{ color: '#10b981' }} />,
        title: 'Panel de Control', 
        desc: 'Presiona "Panel de Control" e inicia sesión con tu cuenta de Google. Simple, rápido y seguro.' 
    },
    { 
        num: 3, 
        icon: <Lock style={{ color: '#f59e0b' }} />,
        title: 'Vincular Placa', 
        desc: 'Ingresa el ID único de tu placa (XXXX-XXXX) y el PIN de activación que recibiste con tu pedido.' 
    },
    { 
        num: 4, 
        icon: <Settings className="text-primary" />,
        title: 'Personalizar', 
        desc: 'Configura nombres, teléfonos de emergencia y mensajes médicos. Los cambios se reflejan al instante.' 
    },
    { 
        num: 5, 
        icon: <Bell style={{ color: '#a855f7' }} />,
        title: 'Notificaciones', 
        desc: 'Cada vez que alguien escanee tu placa, recibirás una alerta inmediata con la ubicación del hallazgo.' 
    },
    { 
        num: 6, 
        icon: <Database style={{ color: '#0ea5e9' }} />,
        title: 'Gestión de Datos', 
        desc: 'Modifica tu información de contacto en cualquier momento sin necesidad de cambiar tu placa física.' 
    }
];

export function HowItWorks() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="how-it-works-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-header"
                    style={{ marginBottom: '60px' }}
                >
                    <span className="section-label">GUÍA DE INICIO</span>
                    <h1 className="section-title">ACTIVA TU PROTECCIÓN <span className="text-primary text-gradient">SAGASON</span></h1>
                    <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        Configura tus tags inteligentes en minutos. Nuestra tecnología 4K asegura que el reencuentro sea solo cuestión de segundos.
                    </p>
                </motion.div>

                {/* Trust Section - Styled like Home.jsx */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-panel glow-card"
                    style={{ marginBottom: '80px', padding: '3rem', position: 'relative', overflow: 'hidden' }}
                >
                    <div className="symbol-container" style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 2rem' }}>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%', 
                                transform: 'translate(-50%, -50%)',
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}
                        />
                        <img 
                            src="/sagason-symbol.png" 
                            alt="Símbolo Sagason" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain', 
                                position: 'relative', 
                                zIndex: 1,
                                filter: 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))'
                            }} 
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', fontFamily: 'var(--font-display)' }}>
                            DONDE ESTÁ ESTE SÍMBOLO, <span className="text-primary">HAY CONFIANZA</span>
                        </h2>
                        <p style={{ color: 'var(--color-muted)', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            El símbolo Sagason identifica una placa de identificación segura y verificada. Cuando lo veas en un collar, mochila o accesorio, 
                            <strong> escanear el QR es completamente seguro</strong> — solo muestra la información necesaria para ayudar.
                        </p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                            {[
                                { text: 'Privacidad Total', icon: <ShieldCheck size={18} /> },
                                { text: 'Sin Descargas', icon: <Zap size={18} /> },
                                { text: 'Seguridad 4K', icon: <CheckCircle2 size={18} /> }
                            ].map(item => (
                                <div key={item.text} className="trust-badge" style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px', 
                                    padding: '10px 20px', 
                                    borderRadius: '30px', 
                                    border: '1px solid rgba(14, 165, 233, 0.3)', 
                                    color: 'var(--color-primary)', 
                                    fontSize: '0.9rem', 
                                    fontWeight: '600',
                                    backgroundColor: 'rgba(14, 165, 233, 0.05)',
                                    backdropFilter: 'blur(5px)'
                                }}>
                                    {item.icon} {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Steps Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="steps-grid" 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '2.5rem' 
                    }}
                >
                    {STEPS.map(step => (
                        <motion.div 
                            key={step.num}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="glass-panel glow-card"
                            style={{ padding: '2.5rem', position: 'relative', height: '100%' }}
                        >
                            <div style={{ 
                                width: '50px', 
                                height: '50px', 
                                backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                                borderRadius: '15px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                marginBottom: '1.5rem' 
                            }}>
                                {React.cloneElement(step.icon, { size: 28 })}
                            </div>
                            
                            <div style={{ 
                                position: 'absolute', 
                                top: '2.5rem', 
                                right: '2.5rem', 
                                fontSize: '3rem', 
                                fontWeight: '900', 
                                opacity: 0.05, 
                                color: 'var(--color-primary)' 
                            }}>
                                0{step.num}
                            </div>

                            <h3 style={{ 
                                color: 'var(--color-primary)', 
                                marginBottom: '1rem', 
                                fontSize: '1.4rem',
                                fontFamily: 'var(--font-display)'
                            }}>
                                {step.title}
                            </h3>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Info Alert */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '5rem' }}
                >
                    <div className="glass-panel" style={{ 
                        padding: '2.5rem', 
                        borderLeft: '4px solid #f59e0b',
                        background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%)'
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '10px', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}>
                                <HelpCircle color="#f59e0b" size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: '#f59e0b', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                                    INFORMACIÓN IMPORTANTE
                                </h3>
                                <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                                    <strong>El tag es único e intransferible.</strong> Una vez vinculado a tu cuenta de Google, se convierte en parte de tu identidad digital Sagason. Protege tu ID y PIN de activación como protegerías las llaves de tu hogar.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginTop: '6rem' }}
                >
                    <div className="glass-panel glow-card" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontFamily: 'var(--font-display)' }}>
                            ¿LISTO PARA <span className="text-primary">EMPEZAR</span>?
                        </h2>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="/dashboard.html" className="btn btn-primary glow" style={{ padding: '1.2rem 3rem' }}>
                                Acceder al Panel <ArrowRight size={20} />
                            </a>
                            <Link to="/#custom" className="btn btn-glass" style={{ padding: '1.2rem 3rem' }}>
                                Personalizar Tag
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
