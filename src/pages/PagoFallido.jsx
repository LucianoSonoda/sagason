import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css';

export default function PagoFallido() {
    useSEO({
        title: 'Pago Cancelado o Fallido | Sagason SpA',
        description: 'Tu pago no pudo ser procesado o fue cancelado. Puedes volver a intentarlo.',
        canonicalPath: '/pago-fallido'
    });

    return (
        <div className="home-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card text-center"
                style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', border: '1px solid rgba(244, 67, 54, 0.3)' }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                    <XCircle size={80} color="#f44336" style={{ margin: '0 auto 1.5rem auto' }} />
                </motion.div>
                
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', backgroundImage: 'linear-gradient(90deg, #f44336, #ff9800)' }}>Pago No Procesado</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dim)', marginBottom: '2rem' }}>
                    Al parecer el pago fue anulado, rechazado por el banco, o hubo un problema de conexión. 
                    No se ha realizado ningún cargo a tu cuenta.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <a href="/checkout" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <RotateCcw size={20} /> Intentar Nuevamente
                    </a>
                    <a href="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Volver al Inicio
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
