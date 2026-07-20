import React from 'react';
import { motion } from 'framer-motion';
import { Brush, Sparkles } from 'lucide-react';
import { Gallery } from '../components/Gallery';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function GaleriaArtistas() {
    useSEO({
        title: 'Galería de Arte y Fotografía en Metal | Sagason SpA',
        description: 'Imprime tu arte digital o fotografía profesional en placas de aluminio con calidad 4K. Ideal para exhibiciones y venta de piezas exclusivas.',
        keywords: 'galeria arte, impresion metal, fotografia metal, aluminio fotografico, Sagason, Chile',
        canonicalPath: '/galeria-artistas'
    });

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
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>PARA CREADORES</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Tu Visión, <span className="text-gradient">En Alta Definición</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Ofrecemos a fotógrafos e ilustradores el formato definitivo para sus obras. La sublimación en metal intensifica el contraste, ilumina los blancos y brinda un acabado tipo galería a cada pieza.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
                            <Brush size={40} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
                            <h3 style={{ marginBottom: '1rem' }}>Colores Vibrantes</h3>
                            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>Nuestra tinta penetra la capa de poliéster del aluminio, haciendo que los colores resalten con un brillo inigualable.</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
                            <Sparkles size={40} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
                            <h3 style={{ marginBottom: '1rem' }}>Ediciones Limitadas</h3>
                            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>Creamos lotes pequeños para artistas que buscan vender ediciones limitadas con certificados de autenticidad grabados en el reverso.</p>
                        </div>
                    </div>

                    <div>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Inspiración Visual</h2>
                        {/* We reuse the existing gallery here */}
                        <Gallery />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
