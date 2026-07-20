import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function Exito() {
    useSEO({
        title: '¡Pago Exitoso! | Sagason SpA',
        description: 'Tu pago ha sido procesado correctamente. Gracias por comprar en Sagason.',
        canonicalPath: '/exito'
    });

    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="home-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card text-center"
                style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                    <CheckCircle size={80} color="#4caf50" style={{ margin: '0 auto 1.5rem auto' }} />
                </motion.div>
                
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Pago Exitoso!</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dim)', marginBottom: '2rem' }}>
                    Hemos recibido tu pedido y el pago se ha procesado correctamente. En breve recibirás un correo electrónico con los detalles y la confirmación.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="feature-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                        <Package size={24} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
                        <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Preparando Envío</h4>
                    </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1.5rem' }}>
                    Serás redirigido a la tienda en {countdown} segundos...
                </p>

                <a href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    Volver a la Tienda <ArrowRight size={20} />
                </a>
            </motion.div>
        </div>
    );
}
