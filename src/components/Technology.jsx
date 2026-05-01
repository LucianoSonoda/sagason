import React from 'react';
import { motion } from 'framer-motion';
import { 
    Cpu, 
    Shield, 
    Diamond, 
    Zap, 
    Cloud, 
    Target,
    Layers,
    Activity,
    Lock,
    Globe,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TECH_FEATURES = [
    {
        pilar: 'Kenshin',
        title: 'INFRAESTRUCTURA RESILIENTE',
        icon: <Cloud className="text-primary" />,
        color: 'var(--color-primary)',
        bg: 'rgba(14, 165, 233, 0.1)',
        desc: 'Nuestro sistema opera sobre una arquitectura de nivel corporativo diseñada para la permanencia absoluta.',
        points: [
            { icon: <Zap size={18} />, label: 'Disponibilidad 24/7', detail: 'Despliegue multiregión con redundancia activa en tiempo real.' },
            { icon: <Target size={18} />, label: 'Grabado Láser 4K', detail: 'Tecnología de fibra a 1064nm para micro-modulación en acero.' }
        ]
    },
    {
        pilar: 'Kizuna',
        title: 'PRIVACIDAD POR DISEÑO',
        icon: <Shield style={{ color: '#10b981' }} />,
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
        desc: 'Tu identidad es sagrada. Hemos diseñado el sistema para proteger tu privacidad por encima de todo.',
        points: [
            { icon: <Lock size={18} />, label: 'Zero-Knowledge Base', detail: 'No recolectamos metadatos publicitarios ni perfiles de usuario.' },
            { icon: <Shield size={18} />, label: 'Baja Entropía', detail: 'Estructuras de datos optimizadas para seguridad y rapidez.' }
        ]
    },
    {
        pilar: 'Kansha',
        title: 'MODELO DE VALOR ÚNICO',
        icon: <Diamond style={{ color: '#a855f7' }} />,
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.1)',
        desc: 'Rompemos el ciclo del SaaS tradicional para ofrecer una protección centrada en el ser humano.',
        points: [
            { icon: <Award size={18} />, label: 'Sin Suscripciones', detail: 'Plan Free renovable que democratiza la seguridad inteligente.' },
            { icon: <Globe size={18} />, label: 'Acceso Universal', detail: 'El rescatista interactúa sin apps, directo desde la web móvil.' }
        ]
    }
];

export function Technology() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="technology-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-header"
                    style={{ marginBottom: '80px' }}
                >
                    <span className="section-label">TECNOLOGÍA SAGASON</span>
                    <h1 className="section-title">DETALLES QUE <span className="text-primary text-gradient">MARCAN DIFERENCIA</span></h1>
                    <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        En un mercado saturado de soluciones genéricas, la estrategia de Sagason SpA se basa en un calce de actividades que prioriza la resiliencia del dato.
                    </p>
                </motion.div>

                {/* Features Stack */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="tech-stack"
                    style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
                >
                    {TECH_FEATURES.map((feature, idx) => (
                        <motion.div 
                            key={feature.pilar}
                            variants={cardVariants}
                            className={`glass-panel glow-card ${idx % 2 === 0 ? '' : 'reverse-layout'}`}
                            style={{ 
                                padding: '4rem', 
                                display: 'flex', 
                                gap: '4rem', 
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse'
                            }}
                        >
                            <div className="feature-visual" style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
                                <motion.div 
                                    animate={{ 
                                        y: [0, -15, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ 
                                        width: '180px', 
                                        height: '180px', 
                                        backgroundColor: feature.bg, 
                                        borderRadius: '40px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        margin: '0 auto',
                                        position: 'relative',
                                        boxShadow: `0 20px 40px ${feature.bg}`
                                    }}
                                >
                                    {React.cloneElement(feature.icon, { size: 80 })}
                                    <div style={{ 
                                        position: 'absolute', 
                                        bottom: '-20px', 
                                        right: '-20px', 
                                        backgroundColor: '#1e293b', 
                                        padding: '10px 20px', 
                                        borderRadius: '15px', 
                                        border: `1px solid ${feature.color}`,
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px',
                                        color: feature.color
                                    }}>
                                        {feature.pilar.toUpperCase()}
                                    </div>
                                </motion.div>
                            </div>

                            <div className="feature-content" style={{ flex: '1.5', minWidth: '300px' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 style={{ 
                                        fontSize: '2.2rem', 
                                        marginBottom: '1rem', 
                                        fontFamily: 'var(--font-display)',
                                        color: 'white'
                                    }}>
                                        {feature.title}
                                    </h2>
                                    <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                        {feature.desc}
                                    </p>
                                </div>

                                <div className="feature-points" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                                    {feature.points.map(point => (
                                        <div key={point.label} style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{ color: feature.color, marginTop: '5px' }}>
                                                {point.icon}
                                            </div>
                                            <div>
                                                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}>{point.label}</h4>
                                                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{point.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tech Specs Table or Stats */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '8rem', textAlign: 'center' }}
                >
                    <div className="glass-panel" style={{ padding: '4rem 2rem' }}>
                        <Layers size={40} className="text-primary" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ marginBottom: '3rem', fontFamily: 'var(--font-display)' }}>ESPECIFICACIONES <span className="text-primary">TÉCNICAS</span></h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                            {[
                                { label: 'Material', value: 'Acero Inoxidable 304L' },
                                { label: 'Modulación', label2: 'Láser Fibra', value: '1064nm' },
                                { label: 'Resolución', value: '4K HD / 1200 DPI' },
                                { label: 'Seguridad', value: 'AES-256 Cloud' }
                            ].map(spec => (
                                <div key={spec.label}>
                                    <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>{spec.label.toUpperCase()}</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{spec.value}</div>
                                </div>
                            ))}
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
                        <Activity size={32} style={{ color: '#ef4444', marginBottom: '1.5rem' }} className="pulse-icon" />
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontFamily: 'var(--font-display)' }}>
                            EXPERIMENTA LA <span className="text-primary">PRECISIÓN 4K</span>
                        </h2>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/#custom" className="btn btn-primary glow" style={{ padding: '1.2rem 3rem' }}>
                                Personalizar Ahora
                            </Link>
                            <a href="/dashboard.html" className="btn btn-glass" style={{ padding: '1.2rem 3rem' }}>
                                Panel de Control
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
