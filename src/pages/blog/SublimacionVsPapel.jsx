import React from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { Sun, Droplets, Image as ImageIcon } from 'lucide-react';
import '../../../src/styles/Home.css';

export default function SublimacionVsPapel() {
    useSEO({
        title: 'Sublimación en Aluminio vs Papel Fotográfico | Sagason',
        description: 'Análisis técnico de resistencia a rayos UV y humedad. Por qué los cuadros de metal sublimados superan al papel en decoración premium.',
        keywords: 'sublimacion en metal, impresion aluminio, resistencia uv cuadros, durabilidad fotos',
        canonicalPath: '/blog/sublimacion-vs-papel'
    });

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <article className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
                    
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>ARTE Y DURABILIDAD</span>
                    <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem 0', lineHeight: '1.2' }}>Sublimación en aluminio vs. Impresión en papel: ¿Cuál resiste mejor?</h1>
                    
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p>Cuando invertimos en conservar un recuerdo fotográfico o adquirir una obra de arte, la durabilidad es el factor decisivo. Históricamente, el papel de algodón o fotográfico y el lienzo (canvas) han dominado el mercado. Sin embargo, la <strong>sublimación térmica sobre aluminio de grado aeronáutico</strong> está reescribiendo los estándares de longevidad en el diseño de interiores.</p>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>El Problema de la Degradación por Rayos UV</h2>
                        <p>Las impresoras de inyección de tinta (inkjet) depositan pigmentos sobre la superficie del papel. Con el tiempo, la radiación ultravioleta rompe los enlaces químicos de estos pigmentos, resultando en un desvanecimiento amarillento. Incluso detrás de vidrios museológicos, el proceso es irreversible.</p>
                        
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                            <p style={{ margin: 0, fontSize: '1rem' }}><Sun size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/> En contraste, el proceso de sublimación a 200°C convierte la tinta en gas, fusionándola molecularmente <em>dentro</em> de un recubrimiento polimérico especializado sobre el aluminio. La imagen no está sobre la superficie; es parte del metal.</p>
                        </div>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>Humedad y Variaciones Térmicas</h2>
                        <p>En ambientes con humedad variable o directamente en exteriores (terrazas, baños, cocinas), el papel absorbe vapor de agua, arrugándose y fomentando el crecimiento de hongos. El lienzo sufre dilataciones térmicas que terminan cuarteando la pintura acrílica.</p>
                        
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <Droplets color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>100% Impermeable:</strong> Puedes literalmente lavar un cuadro de metal Sagason con un paño húmedo. El agua no tiene por dónde penetrar la capa polimérica sellada por calor.
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '12px' }}>
                                <ImageIcon color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: '#fff' }}>Estabilidad Estructural:</strong> El panel de aluminio no se deforma, no se pandea y no requiere marcos con tensores para mantener su rigidez geométrica.
                                </div>
                            </li>
                        </ul>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '1rem' }}>Veredicto</h2>
                        <p>Para aplicaciones de bellas artes, galerías modernas, y preservación de recuerdos invaluables, la sublimación en aluminio HD no es solo una alternativa; es una actualización tecnológica superior que justifica plenamente su posicionamiento premium.</p>
                        
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <a href="/cuadros-metal-hd" className="btn btn-primary">Descubre nuestros Cuadros HD</a>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    );
}
