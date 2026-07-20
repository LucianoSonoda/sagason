import React from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { ShieldCheck, Cpu, Smartphone } from 'lucide-react';
import '../../../src/styles/Home.css';

export default function LeyCholitoVsQR() {
    useSEO({
        title: 'Microchip vs Placa QR: La Guía Definitiva (Ley Cholito) | Sagason',
        description: '¿Es suficiente el microchip obligatorio? Análisis técnico de las ventajas de sumar una placa QR para la rápida recuperación de tu mascota.',
        keywords: 'ley cholito, microchip perros, placa qr, identificacion mascotas chile',
        canonicalPath: '/blog/ley-cholito-vs-qr'
    });

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <article className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
                    
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>SEGURIDAD MASCOTAS</span>
                    <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem 0', lineHeight: '1.2' }}>Microchip Obligatorio vs. Placas de Identificación QR en Chile</h1>
                    
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p>La Ley de Tenencia Responsable (conocida como Ley Cholito) establece la obligatoriedad del microchip en Chile. Sin embargo, en caso de extravío, depender <strong>exclusivamente</strong> de este dispositivo puede retrasar críticamente el retorno de tu mascota a casa.</p>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>El Cuello de Botella del Microchip</h2>
                        <p>El microchip es una cápsula subcutánea pasiva de tecnología RFID (Radio Frequency Identification). Su mayor limitación técnica en emergencias es que <strong>requiere hardware especializado</strong> para ser leído.</p>
                        
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                            <p style={{ margin: 0, fontSize: '1rem' }}><Cpu size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/> Si un vecino encuentra a tu perro un domingo a las 10 PM, no tendrá un lector RFID. Deberá retener al animal hasta el día siguiente para llevarlo a una veterinaria, aumentando el estrés de todos.</p>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>La Solución: Identificación Activa (Placas QR)</h2>
                        <p>Las placas QR de Sagason actúan como un sistema de <strong>resolución inmediata</strong>. Al estar impresas o grabadas en láser sobre metal, convierten cualquier smartphone en un lector universal.</p>
                        
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <Smartphone color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>Cero fricción:</strong> No requiere descargar apps. El rescatista escanea con la cámara nativa de su celular (iOS o Android).
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <ShieldCheck color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>Datos dinámicos:</strong> Si te vas de vacaciones o cambias de número, actualizas el perfil en la nube. El microchip requiere trámites complejos para cambiar datos de registro.
                                </div>
                            </li>
                        </ul>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>Conclusión</h2>
                        <p>El microchip te da <strong>propiedad legal</strong>. La placa QR te da <strong>velocidad de recuperación</strong>. Para una tenencia verdaderamente responsable, ambos sistemas son complementarios e indispensables.</p>
                        
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <a href="/id-mascotas" className="btn btn-primary">Protege a tu mascota con un ID Sagason</a>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    );
}
