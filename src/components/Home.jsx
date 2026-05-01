import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck, Shield, ChevronLeft, ChevronRight, Zap, Target, Cpu, X } from 'lucide-react';
import '../styles/Home.css';
import imgKanji_Kaeru from '../assets/kanji_kaeru.png';
import imgKanji_Kizuna from '../assets/kanji_kizuna.png';
import imgKanji_Kansha from '../assets/kanji_kansha.png';
import imgKanji_Kenshin from '../assets/kanji_kenshin.png';
import sagasonSymbol from '/sagason-symbol.png';

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
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div id="home" className="home-wrapper">
            {/* Hero Section */}
            <section className="hero container">
                <div className="hero-background"></div>
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-label" variants={itemVariants}>
                        <Zap size={14} /> <span>TECNOLOGÍA LÁSER 4K</span>
                    </motion.div>
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        PRECISIÓN QUE <br />
                        <span className="text-gradient">INMORTALIZA</span>
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Cuadros de metal con acabado fotográfico y grabado láser de alta definición. Personalización premium para marcas, hogares y seguridad SOS.
                    </motion.p>
                    <motion.div className="cta-group" variants={itemVariants}>
                        <Link to="/#custom" className="btn btn-primary magnetic">
                            Personalizar Ahora <ArrowRight size={20} />
                        </Link>
                        <Link to="/#gallery" className="btn btn-glass">
                            Ver Catálogo
                        </Link>
                    </motion.div>
                    <motion.div className="hero-stats" variants={itemVariants}>
                        <div className="stat-item">
                            <span className="stat-value">5+</span>
                            <span className="stat-label">Placas Entregadas</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">4K</span>
                            <span className="stat-label">Resolución DPI</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">72h</span>
                            <span className="stat-label">Envío Rápido</span>
                        </div>
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="trust-section glass-panel glow-card"
        >
            <div className="trust-content">
                <div className="symbol-container">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="symbol-halo"
                    />
                    <img
                        src={sagasonSymbol}
                        alt="Símbolo Sagason"
                        className="trust-symbol-img"
                    />
                </div>

                <h2 className="trust-title">
                    DONDE ESTÁ ESTE SÍMBOLO, <span className="text-primary">HAY CONFIANZA</span>
                </h2>
                <p className="trust-desc">
                    El ecosistema Sagason garantiza seguridad y durabilidad. Nuestros QR son verificados y seguros, diseñados para ayudar sin comprometer tu privacidad.
                </p>
                <div className="trust-features">
                    {['Sin Datos Expuestos', 'Sin Apps Extra', 'Privacidad Total'].map(t => (
                        <div key={t} className="trust-feature-item">
                            <Shield size={14} /> <span>{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

const SERVICIOS = [
    { icon: <Target size={32} />, title: 'Nitidez Extrema', desc: 'Acabados en 4K que capturan cada detalle con una fidelidad asombrosa sobre metal real.' },
    { icon: <Cpu size={32} />, title: 'Grabado Digital', desc: 'Procesos automatizados de alta precisión para resultados idénticos en cada pieza.' },
    { icon: <Shield size={32} />, title: 'Resistencia Total', desc: 'Nuestras placas soportan climas extremos, rayos UV y el paso de las décadas.' },
    { icon: <Truck size={32} />, title: 'Logística Ágil', desc: 'Red de distribución nacional para entregas garantizadas en tiempo récord.' },
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
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, [paused, current]);

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.9 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, scale: 0.9 }),
    };

    const svc = SERVICIOS[current];

    return (
        <section className="services-section container">
            <div className="section-header">
                <span className="section-label">EXCELENCIA OPERATIVA</span>
                <h2 className="section-title">DETALLES QUE <span className="text-primary">MARCAN DIFERENCIA</span></h2>
            </div>

            <div className="carousel-container"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <button className="carousel-nav prev" onClick={() => paginate(-1)}><ChevronLeft size={24} /></button>
                <button className="carousel-nav next" onClick={() => paginate(1)}><ChevronRight size={24} /></button>

                <div className="carousel-viewport">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="service-card glass-panel glow-card"
                        >
                            <div className="service-icon-wrapper">{svc.icon}</div>
                            <h3 className="service-title">{svc.title}</h3>
                            <p className="service-desc">{svc.desc}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="carousel-dots">
                    {SERVICIOS.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrent([i, i > current ? 1 : -1])} 
                            className={`dot ${i === current ? 'active' : ''}`}
                        />
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
    };

    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(() => {
            setCurrent(([c]) => [(c + 1) % PILARES.length, 1]);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [paused, current]);

    const variants = {
        enter: (dir) => ({ opacity: 0, filter: 'blur(10px)' }),
        center: { opacity: 1, filter: 'blur(0px)' },
        exit: (dir) => ({ opacity: 0, filter: 'blur(10px)' }),
    };

    const pilar = PILARES[current];

    return (
        <section className="philosophy-section container">
            <div className="section-header">
                <span className="section-label">ADN SAGASON</span>
                <h2 className="section-title">FILOSOFÍA <span className="text-primary">SAGASON 4K</span></h2>
            </div>

            <div className="pilar-carousel"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="pilar-viewport">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6 }}
                            className="pilar-card glass-panel"
                        >
                            {pilar.kanji && (
                                <img
                                    src={pilar.kanji}
                                    alt=""
                                    className="pilar-kanji-bg"
                                />
                            )}
                            <div className="pilar-info">
                                <div className="pilar-header">
                                    <span className="pilar-name">{pilar.name}</span>
                                    <span className="pilar-sub">— {pilar.sub}</span>
                                </div>
                                <p className="pilar-desc">{pilar.desc}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="carousel-dots">
                    {PILARES.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrent([i, 1])} 
                            className={`dot ${i === current ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className="philosophy-ctas">
                <Link to="/aventuras" className="btn btn-primary glow">🗺️ Aventuras</Link>
                <Link to="/como-funciona.html" className="btn btn-glass">¿Cómo funciona?</Link>
                <button onClick={() => setWaitlistOpen(true)} className="btn btn-glass">Lista de Espera</button>
            </div>

            <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} />
        </section>
    );
}

function WaitlistModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            if (res.ok) {
                setStatus('success');
                setMessage('¡Registro exitoso!');
                setTimeout(() => { onClose(); setStatus('idle'); setEmail(''); }, 2000);
            } else {
                throw new Error();
            }
        } catch (err) {
            setStatus('error');
            setMessage('Hubo un error. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div 
                className="modal-content glass-panel"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}><X size={24} /></button>
                <h3>Lista de Espera</h3>
                <p>Únete para ser el primero en conocer nuevas colecciones.</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="glass-input"
                    />
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Enviando...' : 'Unirme'}
                    </button>
                </form>
                {message && <p className={`status-msg ${status}`}>{message}</p>}
            </motion.div>
        </div>
    );
}
