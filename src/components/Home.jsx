import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Image, PenTool, Truck } from 'lucide-react';
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
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        Inmortaliza tus Momentos en <span style={{ color: 'var(--color-primary)' }}>Metal</span>
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Sublimación de alta precisión para placas personalizadas.
                        Desde fotos originales hasta diseños exclusivos de tus juegos, películas y deportes favoritos.
                    </motion.p>
                    <motion.div className="cta-group" variants={itemVariants}>
                        <a href="#custom" className="btn btn-primary">
                            Personalizar Ahora <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </a>
                        <a href="#gallery" className="btn btn-secondary">
                            Ver Catálogo
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Services Overview */}
            <section className="services-section container">
                <div className="section-header">
                    <h2 className="section-title">Nuestra Calidad</h2>
                    <p>La diferencia está en los detalles.</p>
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
                        desc="¿Tienes una idea? Nosotros la creamos. Adaptamos imágenes de tus pasatiempos favoritos al metal."
                        delay={0.2}
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
