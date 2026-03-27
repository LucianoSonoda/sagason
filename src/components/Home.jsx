import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Home.css';

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return width;
}

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
                        ESPECIALISTAS EN PERSONALIZACIÓN
                    </motion.h2>
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        INMORTALIZA <span style={{ color: 'var(--color-primary)' }}>TUS MOMENTOS</span> EN CUADROS DE METAL
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Sublimación premium y personalización en Chile. Cuadros y placas de metal, tazones, rompecabezas y más. Calidad fotográfica para tus recuerdos, diseños o logos corporativos.
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

            {/* Filosofía SAGASON S4K - Carrusel */}
            <S4KCarousel />

            {/* Services Overview - Carrusel */}
            <ServicesCarousel />
        </div>
    );
}

const SERVICIOS = [
    { icon: <Image size={40} />, title: 'Calidad Fotográfica', desc: 'Transferencia de imagen de alta resolución que mantiene los colores vivos y detalles nítidos por años.' },
    { icon: <PenTool size={40} />, title: 'Diseño Personalizado', desc: 'Nosotros hacemos realidad cualquier imagen en metal.' },
    { icon: <Shield size={40} />, title: 'Metal Premium', desc: 'Placas de aluminio de alta calidad, resistentes al agua y el paso del tiempo.' },
    { icon: <Truck size={40} />, title: 'Envío a Todo Chile', desc: 'Embalaje seguro y envíos rápidos para que recibas tu placa en perfectas condiciones.' },
];

function ServicesCarousel() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);
    const isMobile = useWindowWidth() < 640;

    const paginate = (dir) => {
        const next = (current + dir + SERVICIOS.length) % SERVICIOS.length;
        setCurrent([next, dir]);
    };

    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(() => {
            setCurrent(([c]) => [(c + 1) % SERVICIOS.length, 1]);
        }, 3500);
        return () => clearInterval(intervalRef.current);
    }, [paused, current]);

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 220 : -220, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -220 : 220, opacity: 0 }),
    };

    const svc = SERVICIOS[current];

    return (
        <section className="services-section container">
            <div className="section-header">
                <p className="section-subtitle">POR QUÉ ELEGIRNOS</p>
                <h2 className="section-title">LA DIFERENCIA ESTÁ <span style={{ color: 'var(--color-primary)' }}>EN LOS DETALLES</span></h2>
            </div>

            <div style={{ position: 'relative', maxWidth: isMobile ? '100%' : '520px', margin: '0 auto', padding: isMobile ? '0 40px' : '0' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <button onClick={() => paginate(-1)} style={arrowStyle('left')}><ChevronLeft size={22} /></button>
                <button onClick={() => paginate(1)} style={arrowStyle('right')}><ChevronRight size={22} /></button>

                <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="glass-panel service-card"
                            style={{ textAlign: 'center', padding: isMobile ? '28px 20px' : '40px 36px', minHeight: isMobile ? '160px' : '200px', justifyContent: 'center' }}
                        >
                            <div className="service-icon" style={{ marginBottom: '12px' }}>{svc.icon}</div>
                            <h3 className="service-title" style={{ fontSize: isMobile ? '1rem' : undefined, wordBreak: 'break-word' }}>{svc.title}</h3>
                            <p className="service-desc" style={{ fontSize: isMobile ? '13px' : undefined }}>{svc.desc}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                    {SERVICIOS.map((_, i) => (
                        <button key={i} onClick={() => setCurrent([i, i > current ? 1 : -1])} style={{
                            width: i === current ? '24px' : '8px', height: '8px',
                            borderRadius: '9999px', border: 'none', cursor: 'pointer',
                            background: i === current ? 'var(--color-primary)' : 'rgba(14,165,233,0.3)',
                            transition: 'all 0.3s ease', padding: 0,
                        }} />
                    ))}
                </div>
            </div>
        </section>
    );
}


const PILARES = [
    { name: 'Kaeru', sub: 'Regresar', desc: 'Nuestra promesa fundamental. Al escanear el tag, activas un puente digital inmediato que reduce la incertidumbre del extravío.' },
    { name: 'Kizuna', sub: 'Vínculo', desc: 'Gestionas la información de quienes más amas en un entorno seguro y siempre disponible.' },
    { name: 'Kansha', sub: 'Gratitud', desc: 'Diseñamos la interfaz para que quien ayuda lo haga con facilidad. La gratitud permite un ciclo eterno de ayuda al prójimo.' },
    { name: 'Kenshin', sub: 'Dedicación', desc: 'Desde Chile hacia el mundo, cada placa es grabada con precisión láser para resistir el tiempo y la aventura.' },
];

function S4KCarousel() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);
    const isMobile = useWindowWidth() < 640;

    const paginate = (dir) => {
        const next = (current + dir + PILARES.length) % PILARES.length;
        setCurrent([next, dir]);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'pilar_s4k_click', pilar: PILARES[next].name });
    };

    // Auto-play: avanza cada 4 segundos, se pausa con hover
    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(() => {
            setCurrent(([c]) => {
                const next = (c + 1) % PILARES.length;
                return [next, 1];
            });
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, [paused, current]);

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 220 : -220, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -220 : 220, opacity: 0 }),
    };

    const pilar = PILARES[current];

    return (
        <section className="filosofia-4k-section container" style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
            <div className="section-header">
                <p className="section-subtitle">NUESTRA ESENCIA</p>
                <h2 className="section-title">FILOSOFÍA <span style={{ color: 'var(--color-primary)' }}>SAGASON S4K</span></h2>
            </div>

            <div style={{ position: 'relative', maxWidth: isMobile ? '100%' : '560px', margin: '0 auto 36px auto', padding: isMobile ? '0 40px' : '0' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <button onClick={() => paginate(-1)} style={arrowStyle('left')}><ChevronLeft size={22} /></button>
                <button onClick={() => paginate(1)} style={arrowStyle('right')}><ChevronRight size={22} /></button>

                <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            style={{
                                padding: isMobile ? '24px 20px' : '36px 40px', textAlign: 'left',
                                border: '1px solid rgba(14, 165, 233, 0.35)',
                                background: 'rgba(14, 165, 233, 0.05)',
                                borderRadius: '16px', minHeight: isMobile ? '140px' : '160px',
                            }}
                        >
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '1px', wordBreak: 'break-word' }}>{pilar.name}</span>
                                <span style={{ fontSize: '13px', color: 'var(--color-text)', opacity: 0.55, marginLeft: '8px', fontStyle: 'italic' }}>— {pilar.sub}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: isMobile ? '13px' : '15px', lineHeight: '1.75', opacity: 0.88 }}>{pilar.desc}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '18px' }}>
                    {PILARES.map((_, i) => (
                        <button key={i} onClick={() => setCurrent([i, i > current ? 1 : -1])} style={{
                            width: i === current ? '24px' : '8px', height: '8px',
                            borderRadius: '9999px', border: 'none', cursor: 'pointer',
                            background: i === current ? 'var(--color-primary)' : 'rgba(14,165,233,0.3)',
                            transition: 'all 0.3s ease', padding: 0,
                        }} />
                    ))}
                </div>
            </div>

            <motion.blockquote
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                    maxWidth: '580px', margin: '0 auto', padding: '22px 28px',
                    borderLeft: '4px solid var(--color-primary)',
                    background: 'rgba(14, 165, 233, 0.06)',
                    borderRadius: '0 12px 12px 0',
                    textAlign: 'left', fontStyle: 'italic',
                    fontSize: '0.97rem', lineHeight: '1.7',
                    color: 'var(--color-text)', opacity: 0.9,
                }}
            >
                "No proteges un objeto, cuidas el silencio de tu hogar. Asegura el regreso de quien no sabe pedir ayuda."
            </motion.blockquote>
        </section>
    );
}

function arrowStyle(side) {
    return {
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [side]: '-40px', zIndex: 10,
        background: 'rgba(14, 165, 233, 0.12)',
        border: '1px solid rgba(14, 165, 233, 0.4)',
        color: 'var(--color-primary)',
        borderRadius: '50%', width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s ease',
    };
}
