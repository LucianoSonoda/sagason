import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck, Shield } from 'lucide-react';
import '../styles/Home.css';

export function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
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
        <div id="home">
            {/* Hero Section */}
            <section className="hero container">
                <div className="hero-background"></div>
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 className="hero-subtitle-top" variants={itemVariants}>
                        ESPECIALISTAS EN SUBLIMACIÓN Y PERSONALIZACIÓN
                    </motion.h2>
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        INMORTALIZA <span style={{ color: 'var(--color-primary)' }}>TUS MOMENTOS</span> EN CUADROS DE METAL
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Líderes en sublimación premium y personalización en Chile. Cuadros y placas de metal, tazones, rompecabezas y más. Calidad fotográfica infinita para tus recuerdos, diseños o logos corporativos.
                    </motion.p>
                    <motion.div className="cta-group" variants={itemVariants}>
                        <a href="#custom" className="btn btn-primary">
                            Personalizar Ahora <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </a>
                        <a href="#gallery" className="btn btn-secondary">
                            Ver Catálogo
                        </a>
                    </motion.div>
                    <motion.div className="trust-badges" variants={itemVariants}>
                        <span className="badge">100% Metal Premium</span>
                        <span className="badge">Envío A Todo Chile</span>
                        <span className="badge">∞ Personalizable</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* SAGASON S4K Section */}
            <section className="tag-promo-section container">
                <motion.div 
                    className="glass-panel tag-promo-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="tag-promo-content">
                        <span className="promo-badge">NUEVO SISTEMA</span>
                        <h2 className="promo-title">SAGASON <span style={{ color: 'var(--color-primary)' }}>S4K</span></h2>
                        <p className="promo-text" style={{ marginBottom: '10px' }}>Protección inteligente para lo que más quieres. Placas metálicas con QR dinámico para mascotas, personas y equipos.</p>
                        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '25px' }}>¡PRÓXIMO LANZAMIENTO!</p>
                        <div className="promo-ctas">
                            <a href="/como-funciona.html" className="btn btn-outline">¿Cómo funciona?</a>
                            <a href="/tecnologia.html" className="btn btn-outline">Nuestra Tecnología</a>
                            <a href="/dashboard.html" className="btn btn-primary-small">Panel de Control</a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Filosofía SAGASON S4K */}
            <section className="filosofia-4k-section container" style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <div className="section-header">
                    <p className="section-subtitle">NUESTRA ESENCIA</p>
                    <h2 className="section-title">FILOSOFÍA <span style={{ color: 'var(--color-primary)' }}>SAGASON S4K</span></h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    {[
                        { name: 'Kaeru', sub: 'Regresar', desc: 'Nuestra promesa fundamental. Al escanear el tag, activas un puente digital inmediato que reduce la incertidumbre del extravío.' },
                        { name: 'Kizuna', sub: 'Vínculo', desc: 'Gestionas la información de quienes más amas en un entorno seguro y siempre disponible.' },
                        { name: 'Kansha', sub: 'Gratitud', desc: 'Diseñamos la interfaz para que quien ayuda lo haga con facilidad. La gratitud permite un ciclo eterno de ayuda al prójimo.' },
                        { name: 'Kenshin', sub: 'Dedicación', desc: 'Desde Chile hacia el mundo, cada placa es grabada con precisión láser para resistir el tiempo y la aventura.' },
                    ].map((pilar, index) => (
                        <motion.div
                            key={index}
                            className="glass-panel"
                            style={{ padding: '24px', border: '1px solid rgba(14, 165, 233, 0.3)', background: 'rgba(14, 165, 233, 0.04)', borderRadius: '16px', textAlign: 'left' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, borderColor: 'var(--color-primary)' }}
                            onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({ event: 'pilar_s4k_click', pilar: pilar.name });
                            }}
                        >
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '1px' }}>{pilar.name}</span>
                                <span style={{ fontSize: '13px', color: 'var(--color-text)', opacity: 0.6, marginLeft: '8px', fontStyle: 'italic' }}>— {pilar.sub}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.7', opacity: 0.85 }}>{pilar.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        maxWidth: '620px', margin: '0 auto', padding: '24px 32px',
                        borderLeft: '4px solid var(--color-primary)',
                        background: 'rgba(14, 165, 233, 0.06)',
                        borderRadius: '0 12px 12px 0',
                        textAlign: 'left', fontStyle: 'italic',
                        fontSize: '1rem', lineHeight: '1.7',
                        color: 'var(--color-text)', opacity: 0.9,
                    }}
                >
                    "No proteges un objeto, cuidas el silencio de tu hogar. Asegura el regreso de quien no sabe pedir ayuda."
                </motion.blockquote>
            </section>

            {/* Services Overview */}
            <section className="services-section container">
                <div className="section-header">
                    <p className="section-subtitle">POR QUÉ ELEGIRNOS</p>
                    <h2 className="section-title">LA DIFERENCIA ESTÁ <span style={{ color: 'var(--color-primary)' }}>EN LOS DETALLES</span></h2>
                </div>

                <div className="services-grid">
                    <ServiceCard
                        icon={<Image size={40} />}
                        title="Calidad Fotográfica"
                        desc="Transferencia de imagen de alta resolución que mantiene los colores vivos y detalles nítidos por años."
                        delay={0}
                    />
                    <ServiceCard
                        icon={<PenTool size={40} />}
                        title="Diseño Personalizado"
                        desc="Nosotros hacemos realidad cualquier imagen en metal."
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={<Shield size={40} />}
                        title="Metal Premium"
                        desc="Placas de aluminio de alta calidad, resistentes al agua y el paso del tiempo."
                        delay={0.3}
                    />
                    <ServiceCard
                        icon={<Truck size={40} />}
                        title="Envío a Todo Chile"
                        desc="Embalaje seguro y envíos rápidos para que recibas tu placa en perfectas condiciones."
                        delay={0.4}
                    />
                </div>
            </section>
        </div>
    );
}

function ServiceCard({ icon, title, desc, delay }) {
    return (
        <motion.div
            className="glass-panel service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="service-icon">{icon}</div>
            <h3 className="service-title">{title}</h3>
            <p className="service-desc">{desc}</p>
        </motion.div>
    );
}
