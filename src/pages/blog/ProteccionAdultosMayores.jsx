import React from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { Lock, HeartPulse, ShieldAlert } from 'lucide-react';
import '../../../src/styles/Home.css';

export default function ProteccionAdultosMayores() {
    useSEO({
        title: 'Proteger historial médico de adultos mayores | Sagason',
        description: 'Cómo proteger la información médica vital de personas mayores en la vía pública usando tecnología QR encriptada, sin vulnerar su privacidad.',
        keywords: 'identificacion alzheimer, placa qr adultos mayores, historial medico emergencia',
        canonicalPath: '/blog/proteccion-adultos-mayores'
    });

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <article className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
                    
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>ID SALUD</span>
                    <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem 0', lineHeight: '1.2' }}>Cómo proteger el historial médico de adultos mayores en la vía pública</h1>
                    
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p>El cuidado de adultos mayores, especialmente aquellos con padecimientos como Alzheimer o demencia senil, presenta un desafío crítico de seguridad en la vía pública. ¿Cómo proveer a paramédicos o transeúntes de información vital (medicamentos, tipo de sangre, contactos) sin exponer sus datos personales a cualquier persona que pase por su lado?</p>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>El Riesgo de las Pulseras Tradicionales</h2>
                        <p>Las pulseras grabadas estáticas suelen exhibir padecimientos crónicos y números de teléfono directamente a simple vista. Aunque esto es útil en una emergencia, representa una <strong>falla de privacidad grave</strong> en el día a día, haciendo al usuario vulnerable a estafas o sesgos.</p>
                        
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                            <p style={{ margin: 0, fontSize: '1rem' }}><Lock size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/> En Sagason, resolvemos esto desacoplando la información del soporte físico. La placa o medalla de acero solo lleva un símbolo médico reconocible y un código QR unívoco.</p>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>Gestión de Datos y Privacidad Asimétrica</h2>
                        <p>A través de nuestro panel de control, el tutor legal o familiar puede establecer niveles de visibilidad:</p>
                        
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <ShieldAlert color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>Modo Normal:</strong> El escaneo solo muestra un botón para llamar al contacto de emergencia, ocultando la ficha médica.
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <HeartPulse color="#ef4444" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>Modo SOS (Crisis):</strong> Al activarse remotamente por el tutor, el QR desbloquea instantáneamente el historial completo (alergias a la penicilina, dosis de anticoagulantes, etc.) para acelerar el triage pre-hospitalario.
                                </div>
                            </li>
                        </ul>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>Conclusión</h2>
                        <p>La tecnología vestible no debe comprometer la dignidad. Mediante medallas de acero grabadas con precisión láser y gestión en la nube, garantizamos que la información vital esté disponible exactamente <strong>cuándo y para quién</strong> es necesaria.</p>
                        
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <a href="/id-salud" className="btn btn-primary">Configura un ID de Salud</a>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    );
}
