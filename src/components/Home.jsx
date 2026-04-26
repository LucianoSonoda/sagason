import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Home.css';
import imgKanji_Kaeru from '../assets/kanji_kaeru.png';
import imgKanji_Kizuna from '../assets/kanji_kizuna.png';
import imgKanji_Kansha from '../assets/kanji_kansha.png';
import imgKanji_Kenshin from '../assets/kanji_kenshin.png';
import sagasonSymbol from '../../public/sagason-symbol.png';

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

            {/* Símbolo de confianza */}
            <TrustSymbolSection />

            {/* SAGASON 4K — Sección unificada */}
            <S4KCarousel />

            {/* Services Overview - Carrusel */}
            <ServicesCarousel />
        </div>
    );
}

function TrustSymbolSection() {
    const isMobile = useWindowWidth() < 640;
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
                textAlign: 'center',
                padding: isMobile ? '28px 16px 24px' : '36px 20px 30px',
                margin: '0 auto 8px auto',
                maxWidth: '560px',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(16,185,129,0.06) 100%)',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '24px',
            }}
        >
            {/* Símbolo con halo pulsante */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '18px' }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', inset: '-12px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />
                <img
                    src={sagasonSymbol}
                    alt="Símbolo Sagason"
                    style={{
                        width: isMobile ? '100px' : '120px',
                        height: isMobile ? '100px' : '120px',
                        borderRadius: '50%',
                        display: 'block',
                        position: 'relative',
                        zIndex: 1,
                        filter: 'drop-shadow(0 0 18px rgba(14,165,233,0.45))',
                    }}
                />
            </div>

            <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Al ver este símbolo, puedes{' '}
                <span style={{ color: 'var(--color-primary)' }}>confiar</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(248,250,252,0.6)', lineHeight: 1.65, maxWidth: '380px', margin: '0 auto 16px' }}>
                El símbolo Sagason identifica una placa segura y verificada.
                Cuando lo veas, <strong style={{ color: 'rgba(248,250,252,0.85)' }}>escanear el QR es completamente seguro</strong> — solo muestra información de contacto para ayudar a quien lo necesita.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                {['✅ Sin datos personales expuestos', '✅ Sin instalación de apps', '✅ Solo abre una página web'].map(t => (
                    <span key={t} style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: '20px', padding: '5px 13px',
                        fontSize: '12px', fontWeight: 600, color: '#10b981',
                    }}>{t}</span>
                ))}
            </div>
        </motion.section>
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
    { name: 'Kaeru', sub: 'Regresar', desc: 'Nuestra promesa fundamental. Al escanear el tag, activas un puente digital inmediato que reduce la incertidumbre del extravío.', kanji: imgKanji_Kaeru },
    { name: 'Kizuna', sub: 'Vínculo', desc: 'Gestionas la información de quienes más amas en un entorno seguro y siempre disponible.', kanji: imgKanji_Kizuna },
    { name: 'Kansha', sub: 'Gratitud', desc: 'Diseñamos la interfaz para que quien ayuda lo haga con facilidad. La gratitud permite un ciclo eterno de ayuda al prójimo.', kanji: imgKanji_Kansha },
    { name: 'Kenshin', sub: 'Dedicación', desc: 'Desde Chile hacia el mundo, cada placa es grabada con precisión láser para resistir el tiempo y la aventura.', kanji: imgKanji_Kenshin },
];

function S4KCarousel() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [paused, setPaused] = useState(false);
    const [isWaitlistOpen, setWaitlistOpen] = useState(false);
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
            {/* Encabezado unificado */}
            <div className="section-header">
                <span className="promo-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>CREAR LAZO INVISIBLE</span>
                <p className="section-subtitle">NUESTRA ESENCIA</p>
                <h2 className="section-title">FILOSOFÍA <span style={{ color: 'var(--color-primary)' }}>SAGASON 4K</span></h2>
            </div>

            <div style={{ position: 'relative', maxWidth: isMobile ? '100%' : '600px', margin: '0 auto 36px auto', padding: isMobile ? '0 40px' : '0' }}
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
                                position: 'relative', overflow: 'hidden',
                                padding: isMobile ? '24px 16px' : '32px 36px',
                                border: '1px solid rgba(14, 165, 233, 0.35)',
                                background: 'rgba(14, 165, 233, 0.05)',
                                borderRadius: '16px', minHeight: isMobile ? '130px' : '155px',
                                textAlign: 'left',
                            }}
                        >
                            {/* Kanji de fondo — metálico, sin fondo blanco */}
                            {pilar.kanji && (
                                <img
                                    src={pilar.kanji}
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        height: '104%',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        opacity: 0.35,
                                        filter: 'invert(1) sepia(0.6) saturate(2) hue-rotate(5deg) brightness(1.2)',
                                        mixBlendMode: 'screen',
                                        pointerEvents: 'none',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {/* Texto encima */}
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ marginBottom: '10px' }}>
                                    <span style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '1px' }}>{pilar.name}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.55, marginLeft: '8px', fontStyle: 'italic' }}>— {pilar.sub}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: isMobile ? '13px' : '14.5px', lineHeight: '1.7', opacity: 0.88 }}>{pilar.desc}</p>
                            </div>
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

            {/* CTA links */}
            <div className="promo-ctas" style={{ justifyContent: 'center', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link to="/aventuras" className="btn btn-primary" style={{ border: '2px solid var(--color-primary)', boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)', fontWeight: '800' }}>🗺️ Aventuras en Familia</Link>
                <a href="/como-funciona.html" className="btn btn-outline">¿Cómo funciona?</a>
                <a href="/tecnologia.html" className="btn btn-outline">Nuestra Tecnología</a>
                <a href="/dashboard.html" className="btn btn-primary-small">Panel de Control</a>
                <button onClick={() => setWaitlistOpen(true)} className="btn btn-primary-small" style={{ cursor: 'pointer' }}>Lista de Espera</button>
            </div>

            <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} />

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

function WaitlistModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
            // Obtener localización aproximada amablemente por IP (sin alertar con permisos GPS al usuario)
            let geoData = { city: "Desconocida", country_name: "Desconocido" };
            try {
                const geoResponse = await fetch('https://ipapi.co/json/');
                if (geoResponse.ok) {
                    geoData = await geoResponse.json();
                }
            } catch (err) {
                console.log("No se pudo obtener localización: ", err);
            }

            const locationStr = `${geoData.city}, ${geoData.country_name}`;

            try {

            const res = await fetch('https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod/waitlist', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, location: locationStr })
            });
            if (res.ok) {
                setStatus('success');
                setMessage('¡Kansha! Registro exitoso.');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'social_waitlist_signup', pilar: 'Kansha' });
                setTimeout(() => { onClose(); setStatus('idle'); setEmail(''); setMessage(''); }, 3000);
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Error de conexión. Intenta de nuevo.');
        }
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    style={{
                        background: '#1a1a1a', padding: '32px', borderRadius: '16px',
                        maxWidth: '420px', width: '90%', border: '1px solid rgba(14, 165, 233, 0.3)',
                        textAlign: 'center', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                    }}
                >
                    <button onClick={onClose} style={{
                        position: 'absolute', top: '16px', right: '16px', background: 'transparent',
                        border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', opacity: 0.7
                    }}>&times;</button>
                    <h2 style={{ marginBottom: '8px', color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>🌱 Fondo Social</h2>
                    <p style={{ fontSize: '14px', marginBottom: '24px', color: '#ccc', lineHeight: '1.5' }}>
                        Inscríbete para recibir noticias sobre nuestra primera entrega de placas gratuitas.
                    </p>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input 
                            type="email" placeholder="tu@email.com" required value={email}
                            onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'}
                            style={{
                                padding: '14px', borderRadius: '8px', border: '1px solid #333',
                                background: '#0a0a0a', color: '#fff', outline: 'none', width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                        <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%', padding: '14px', border: 'none', cursor: 'pointer' }}>
                            {status === 'loading' ? 'Procesando...' : 'Avisarme al abrir'}
                        </button>
                        {message && (
                            <p style={{ color: status === 'success' ? '#2ecc71' : '#e74c3c', fontSize: '14px', margin: 0 }}>
                                {message}
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
