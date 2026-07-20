import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Calendar, User, CheckCircle, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThreeInsignia } from './ThreeInsignia';
import { useSEO } from '../hooks/useSEO';
import '../styles/CustomForm.css';

export function InsigniaForm() {
    useSEO({
        title: 'Solicitar Insignia Turística Personalizada | Sagason SpA',
        description: 'Personaliza y encarga tu insignia turística en acero inoxidable grabada con precisión láser. Guarda tus recuerdos y aventuras para siempre.',
        keywords: 'insignia turística, placa personalizada, grabado láser, acero inoxidable, Sagason',
        canonicalPath: '/insignia'
    });

    const [cachedDestinations, setCachedDestinations] = useState([]);
    
    const [selections, setSelections] = useState({
        lugar: "",
        fecha: "",
        nombre: "",
        tamano: "10mm Circular",
        cantidad: "1"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const location = useLocation();

    useEffect(() => {
        // Desplazamiento instantáneo al inicio al cargar el formulario
        window.scrollTo({ top: 0, behavior: 'auto' });

        // Parse from URL search params (e.g. /insignia?lugar=Parque%20Araucano)
        const searchParams = new URLSearchParams(location.search);
        const lugar = searchParams.get('lugar');
        if (lugar) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelections(prev => ({ ...prev, lugar: lugar }));
        }

        // Load Datalist from LocalStorage (Aventuras VIPs generadas)
        const cachedData = localStorage.getItem("sagasonAdvCultData");
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                setCachedDestinations(parsed.map(p => p.title));
            } catch (e) {
                console.error(e);
            }
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelections(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target;

        // Registro de BD AWS en paralelo silencioso (opcional, extraemos solo el mail si aplica)
        try {
            const emailValue = form.querySelector('input[name="email"]').value;
            fetch('https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod/customers', {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pedido_id: `INSIGNIA-${Date.now().toString(36).toUpperCase()}`,
                    email: emailValue,
                    name: selections.nombre,
                    product: `Insignia Turística Acero Inox (Cant: ${selections.cantidad})`,
                    category: selections.lugar,
                    size: selections.tamano
                })
            }).catch((e) => { console.error(e); });
        } catch (e) { console.error(e); }

        // Envío Nivel 2: Directo al correo via FormSubmit
        form.submit();
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
        }, 1200);
    };

    if (submitStatus === 'success') {
        return (
            <section id="insignia" className="custom-section container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <h2 className="section-title">¡SOLICITUD <span style={{ color: 'var(--color-primary)' }}>ASEGURADA!</span></h2>
                    <p className="section-subtitle">Estamos listos para forjar tus recuerdos en acero.</p>
                </div>
                <div className="form-wizard-container">
                    <div className="form-content-panel glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><CheckCircle size={64} style={{ margin: '0 auto' }}/></div>
                        <h3>¡Misión Confimada!</h3>
                        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>Hemos recibido los datos de tu aventura en <strong>{selections.lugar}</strong>. Dentro de poco nuestro orfebre digital te contactará al mail ingresado para los detalles de producción.</p>
                        <Link to="/aventuras" className="btn btn-outline">Descubrir más lugares</Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="insignia" className="custom-section container" style={{ paddingTop: '100px', paddingBottom: '60px', position: 'relative', zIndex: 10 }}>
            <div className="section-header" style={{ marginBottom: '30px' }}>
                <span className="promo-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>LÍNEA CONMEMORATIVA</span>
                <h1 className="section-title">INMORTALIZA TU <span style={{ color: 'var(--color-primary)' }}>AVENTURA</span></h1>
                <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>Insignias sólidas de Acero Inoxidable grabadas en precisión láser para recordar aquellos paseos familiares que dejan una huella imborrable.</p>
            </div>

            <div className="form-wizard-container" style={{ maxWidth: '650px', margin: '0 auto' }}>
                <div className="form-content-panel glass-panel" style={{ padding: '40px 30px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px', opacity: 0.9 }}>
                        <Award size={46} color="var(--color-primary)" style={{ marginBottom: '10px' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Diseño Insignia Familiar</h3>
                        <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Al llenar esta ficha sin costo, nuestro equipo creará un boceto y procederá con cotización y validación manual.</p>
                    </div>

                    <React.Suspense fallback={<div style={{height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'}}>Cargando visualizador 3D interactivo...</div>}>
                        <ThreeInsignia lugar={selections.lugar} fecha={selections.fecha} nombre={selections.nombre} tamano={selections.tamano} />
                    </React.Suspense>

                    <iframe name="hidden_iframe_insignia" style={{display: "none"}}></iframe>
                    <form action="https://formsubmit.co/sagason@sagason.cl" method="POST" target="hidden_iframe_insignia" onSubmit={handleFormSubmit}>
                        <input type="hidden" name="_subject" value="⭐ Nueva Solicitud de Insignia Turística" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="Tipo Pedido" value="Insignia Circular Acero Inox" />
                        
                        {/* Datalist Source */}
                        <datalist id="sugerencias-lugares">
                            {cachedDestinations.map((l, i) => (
                                <option key={i} value={l} />
                            ))}
                        </datalist>

                        <div className="fields-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MapPin size={16} color="var(--color-primary)" /> LOCAL VISITADO *
                                </label>
                                <input 
                                    list="sugerencias-lugares" 
                                    type="text" 
                                    name="lugar" 
                                    className="form-input" 
                                    value={selections.lugar} 
                                    onChange={handleChange}
                                    placeholder="Ej: Parque Bicentenario (puedes escribir cualquiera)"
                                    required
                                />
                                <p style={{ fontSize: '0.75rem', marginTop: '6px', color: '#888' }}>*Escribe libremente o escoge de nuestra lista VIP.</p>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={16} color="var(--color-primary)" /> FECHA DE VISITA *
                                </label>
                                <input 
                                    type="date" 
                                    name="fecha" 
                                    className="form-input" 
                                    value={selections.fecha} 
                                    onChange={handleChange}
                                    required
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <User size={16} color="var(--color-primary)" /> NOMBRE DE LA FAMILIA/PERSONA *
                                </label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    className="form-input" 
                                    value={selections.nombre} 
                                    onChange={handleChange}
                                    placeholder="Ej: Familia Soto González"
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    DIÁMETRO DE INSIGNIA (ACERO INOXIDABLE) *
                                </label>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 15px', background: selections.tamano === '10mm Circular' ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.05)', border: selections.tamano === '10mm Circular' ? '1px solid var(--color-primary)' : '1px solid transparent', borderRadius: '8px', transition: 'all 0.2s' }}>
                                        <input type="radio" name="tamano" value="10mm Circular" checked={selections.tamano === '10mm Circular'} onChange={handleChange} style={{ accentColor: 'var(--color-primary)' }} />
                                        10mm Circular
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 15px', background: selections.tamano === '15mm Circular' ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.05)', border: selections.tamano === '15mm Circular' ? '1px solid var(--color-primary)' : '1px solid transparent', borderRadius: '8px', transition: 'all 0.2s' }}>
                                        <input type="radio" name="tamano" value="15mm Circular" checked={selections.tamano === '15mm Circular'} onChange={handleChange} style={{ accentColor: 'var(--color-primary)' }} />
                                        15mm Circular
                                    </label>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">CANTIDAD *</label>
                                <input 
                                    type="number" 
                                    name="cantidad" 
                                    className="form-input" 
                                    min="1"
                                    max="50"
                                    value={selections.cantidad} 
                                    onChange={handleChange}
                                    required 
                                />
                                <p style={{ fontSize: '0.75rem', marginTop: '6px', color: '#888' }}>* ¿Llevarás una para cada integrante de la familia?</p>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">CORREO ELECTRÓNICO (PARA CONTACTARTE) *</label>
                                <input type="email" name="email" className="form-input" required placeholder="tu@email.com"/>
                            </div>
                        </div>

                        <div className="step-actions" style={{ justifyContent: 'center', marginTop: '35px' }}>
                            <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '300px' }}>
                                {isSubmitting ? <span>Forjando...</span> : <><Send size={18} /> Solicitar Insignia</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

// 🎨 InsigniaVisualizer Canvas - Grabado láser de precisión sobre acero circular
function InsigniaVisualizer({ lugar, fecha, nombre, tamano }) {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = Math.min(cx, cy) - 20;

        // Metal reflective gradient
        const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, r + 40);
        grad.addColorStop(0, '#ffffff'); // Center shine
        grad.addColorStop(0.35, '#d1d5db'); // Sleek metal silver
        grad.addColorStop(0.7, '#475569'); // Steel shading
        grad.addColorStop(1, '#0f172a'); // Outer shadow

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Premium borders
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r - 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.5)'; // Sagason precise blue
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner circular guideline for text path
        ctx.beginPath();
        ctx.arc(cx, cy, r - 25, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Central Star Emblem
        ctx.fillStyle = '#0f172a'; // Etched color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.font = '28px "Space Grotesk", sans-serif';
        ctx.fillText('⭐', cx, cy - 10);

        // Header Text
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10px monospace';
        ctx.fillText('SAGASON SOUVENIR LÍNEA VIP', cx, cy - r * 0.58);

        // Location Visited
        const displayLugar = lugar ? (lugar.length > 20 ? lugar.substring(0, 18) + '...' : lugar) : 'AVENTURA EXTREMA';
        ctx.font = 'bold 12px "Space Grotesk", sans-serif';
        ctx.fillText(displayLugar.toUpperCase(), cx, cy + 18);

        // Date Visited
        let displayFecha = 'FECHA DE VISITA';
        if (fecha) {
            const dateParts = fecha.split('-');
            if (dateParts.length === 3) displayFecha = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }
        ctx.font = 'bold 9px monospace';
        ctx.fillText(displayFecha, cx, cy + 34);

        // Family Name / Person Name
        const displayNombre = nombre ? (nombre.length > 24 ? nombre.substring(0, 22) + '...' : nombre) : 'FAMILIA VIAJERA';
        ctx.font = '800 10.5px "Space Grotesk", sans-serif';
        ctx.fillText(displayNombre.toUpperCase(), cx, cy + 50);

        // Badge size indicator
        ctx.font = '800 8.5px "IBM Plex Mono", monospace';
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText(`DIÁMETRO: ${tamano || '10MM'}`, cx, cy - r * 0.4);

        ctx.restore();
    }, [lugar, fecha, nombre, tamano]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px auto', padding: '20px', backgroundColor: 'rgba(18, 18, 20, 0.45)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', width: '100%', maxWidth: '300px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>⭐ CONMEMORACIÓN ACERO LÁSER</span>
            <canvas ref={canvasRef} width={250} height={250} style={{ width: '200px', height: '200px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))', display: 'block' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '14px', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4' }}>Insignia circular maciza grabada con micro-láser 4K.</span>
        </div>
    );
}

