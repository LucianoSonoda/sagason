import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';
import { GlobalStatsMap } from '../components/GlobalStatsMap';

export function Tags4K() {
    return (
        <div className="tags4k-page container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-header"
                style={{ textAlign: 'center', marginBottom: '40px' }}
            >
                <span className="section-label">RED GLOBAL DE SEGURIDAD</span>
                <h1 className="section-title">COMUNIDAD <span className="text-primary">SAGASON 4K</span></h1>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '20px auto' }}>
                    Nuestra tecnología no solo graba con precisión, sino que conecta a miles de personas bajo un mismo estándar de protección inteligente.
                </p>
            </motion.div>

            <GlobalStatsMap />

            <div className="features-grid" style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <FeatureCard 
                    icon={<Zap className="text-primary" />}
                    title="Grabado 4K"
                    desc="Resolución fotográfica sobre metal que garantiza la legibilidad del QR incluso en condiciones extremas."
                />
                <FeatureCard 
                    icon={<Globe className="text-success" />}
                    title="Cobertura Global"
                    desc="Tu placa funciona en cualquier parte del mundo sin necesidad de descargar aplicaciones adicionales."
                />
                <FeatureCard 
                    icon={<Shield className="text-primary" />}
                    title="Privacidad Militar"
                    desc="Encriptación de datos y gestión de visibilidad controlada directamente desde tu panel."
                />
                <FeatureCard 
                    icon={<Cpu className="text-success" />}
                    title="Inteligencia SOS"
                    desc="Detección de ubicación y alertas inmediatas vía Email y WhatsApp al detectar un escaneo."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel glow-card" 
            style={{ padding: '30px', borderRadius: '24px' }}
        >
            <div style={{ marginBottom: '15px' }}>{icon}</div>
            <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '18px' }}>{title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', line-height: '1.6' }}>{desc}</p>
        </motion.div>
    );
}
