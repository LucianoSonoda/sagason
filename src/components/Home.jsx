import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck, Shield, ChevronLeft, ChevronRight, Zap, Target, Cpu, X, Infinity } from 'lucide-react';
import '../styles/Home.css';
import imgKanji_Kaeru from '../assets/kanji_kaeru.png';
import imgKanji_Kizuna from '../assets/kanji_kizuna.png';
import imgKanji_Kansha from '../assets/kanji_kansha.png';
import imgKanji_Kenshin from '../assets/kanji_kenshin.png';
import sagasonSymbol from '/sagason-symbol.png';
import { DiscoverCity } from './DiscoverCity';
import { CustomForm } from './CustomForm';
import { Gallery } from './Gallery';

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
                        <Zap size={14} /> <span>GRABADO LÁSER · HECHO CON ALMA</span>
                    </motion.div>
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        LOS MOMENTOS QUE <br />
                        <span className="text-gradient">IMPORTAN PARA SIEMPRE</span>
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Transformamos tus recuerdos más especiales en piezas de metal que duran toda la vida. Para tu hogar, tu mascota, las personas que más quieres.
                    </motion.p>
                    <motion.div className="cta-group" variants={itemVariants}>
                        <Link to="/#custom" className="btn btn-primary magnetic">
                            Crea tu pieza <ArrowRight size={20} />
                        </Link>
                        <Link to="/#gallery" className="btn btn-glass">
                            Ver inspiración
                        </Link>
                    </motion.div>
                    <motion.div className="hero-stats" variants={itemVariants}>
                        <div className="stat-item">
                            <span className="stat-value">4K</span>
                            <span className="stat-label">Resolución Láser</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">72h</span>
                            <span className="stat-label">Envío Rápido</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Personalizable</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value" style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
                                <Infinity size={36} strokeWidth={3} />
                            </span>
                            <span className="stat-label">Durabilidad</span>
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

            {/* Gallery Section */}
            <div id="gallery">
                <Gallery />
            </div>

            {/* Customizer Section */}
            <div id="custom">
                <CustomForm />
            </div>
        </div>
    );
}

function TrustSymbolSection() {
    const isMobile = useWindowWidth() < 640;
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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
                        loading="lazy"
                        className="trust-symbol-img"
                    />
                </div>

                <h2 className="trust-title">
                    DONDE ESTÁ ESTE SÍMBOLO, <span className="text-primary">ALGUIEN CUIDA</span>
                </h2>
                <p className="trust-desc">
                    Cada placa Sagason lleva una promesa: si algo se pierde, el camino de regreso siempre existe. Nuestros QR conectan a quien ayuda contigo, sin exponer tus datos ni pedir apps.
                </p>
                <div className="trust-features">
                    {['Tu privacidad, intacta', 'Sin apps, sin barreras', 'Siempre disponible'].map(t => (
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
    { icon: <Target size={32} />, title: 'Cada detalle, vivo', desc: 'La resolución 4K captura lo que el ojo apenas nota: la textura de un abrazo, la luz de ese día especial.' },
    { icon: <Cpu size={32} />, title: 'Hecho solo para ti', desc: 'No hay dos piezas iguales. Cada grabado es único porque el recuerdo que guarda también lo es.' },
    { icon: <Shield size={32} />, title: 'Dura lo que el amor', desc: 'Metal que resiste décadas, lluvia, sol y tiempo. Porque lo que más importa merece no desvanecerse.' },
    { icon: <Truck size={32} />, title: 'Llega donde estés', desc: 'Enviamos a todo Chile y al mundo. Tu pieza llega lista para regalar, colgar o atesorar.' },
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
                <span className="section-label">POR QUÉ SAGASON</span>
                <h2 className="section-title">HECHO PARA <span className="text-primary">DURAR CONTIGO</span></h2>
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
    { name: 'Kaeru', sub: 'Regresar', desc: 'La promesa que lo une todo. Si tu mascota se pierde, si tu mochila queda en el metro, si alguien necesita ayuda — un escaneo es todo lo que se necesita para volver a casa.', kanji: imgKanji_Kaeru },
    { name: 'Kizuna', sub: 'Vínculo', desc: 'Los lazos que nos importan merecen protección. Guardamos la información de quienes más quieres de forma segura, para que el amor siempre encuentre el camino.', kanji: imgKanji_Kizuna },
    { name: 'Kansha', sub: 'Gratitud', desc: 'Quien ayuda merece que sea fácil hacerlo. Diseñamos cada detalle para que un extraño pueda devolverte lo tuyo con un solo gesto, y sentir que valió la pena.', kanji: imgKanji_Kansha },
    { name: 'Kenshin', sub: 'Dedicación', desc: 'Cada placa sale de nuestras manos con el cuidado de quien sabe que guardará un recuerdo. Grabado láser de precisión, desde Chile, para durar toda una vida.', kanji: imgKanji_Kenshin },
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
        enter: (dir) => ({ opacity: 0 }),
        center: { opacity: 1 },
        exit: (dir) => ({ opacity: 0 }),
    };

    const pilar = PILARES[current];

    return (
        <section className="philosophy-section container">
            <div className="section-header">
                <span className="section-label">LO QUE NOS MUEVE</span>
                <h2 className="section-title">EL ALMA DETRÁS DE <span className="text-primary">CADA PIEZA</span></h2>
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
                                    loading="lazy"
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
                <Link to="/como-funciona" className="btn btn-glass">¿Cómo funciona?</Link>
                <Link to="/tecnologia" className="btn btn-glass">Tecnología</Link>
                <button onClick={() => setWaitlistOpen(true)} className="btn btn-glass">Lista de Espera</button>
            </div>

            <AnimatePresence>
                {isWaitlistOpen && (
                    <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} />
                )}
            </AnimatePresence>
        </section>
    );
}

function WaitlistModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

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
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.25 }}
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
