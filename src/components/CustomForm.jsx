import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { Upload, Send, Coffee, Mouse, Image as ImageIcon, Key, Dog, Heart, Puzzle, CupSoda, Package, CheckCircle, Printer, Award } from 'lucide-react';
import '../styles/CustomForm.css';
import { Universal3DViewer } from './Universal3DViewer';
import { Mockup2DViewer } from './Mockup2DViewer';

const PRODUCTS = [
    { id: 'posavasos', icon: Coffee, title: 'POSAVASOS', desc: 'Set de posavasos de MDF con corcho' },
    { id: 'mousepad', icon: Mouse, title: 'MOUSEPAD', desc: 'Mousepad sublimado de alta resolución' },
    { id: 'cuadro', icon: ImageIcon, title: 'CUADRO HD', desc: 'Cuadro en metal con impresión en alta definición' },
    { id: 'llaveros', icon: Key, title: 'LLAVEROS', desc: 'Llaveros personalizados (Metal, Acrílico, MDF)' },
    { id: 'id-mascotas', icon: Dog, title: 'ID MASCOTAS', desc: 'Identificación para mascota (Metal, Acrílico, MDF)' },
    { id: 'id-salud', icon: Heart, title: 'ID SALUD', desc: 'Identificación de enfermedades y alergias' },
    { id: 'rompecabezas', icon: Puzzle, title: 'ROMPECABEZAS', desc: 'Rompecabezas personalizado con tu diseño o foto' },
    { id: 'tazones', icon: Coffee, title: 'TAZONES', desc: 'Tazones sublimados personalizados' },
    { id: 'tumblers', icon: CupSoda, title: 'TUMBLERS', desc: 'Tumbler / vaso térmico personalizado' },
    { id: 'impresion3d', icon: Printer, title: 'IMPRESIÓN 3D', desc: 'Piezas y modelos impresos en 3D' },
    { id: 'insignias', icon: Award, title: 'INSIGNIAS', desc: 'Insignias circulares de acero inoxidable (10mm / 15mm)' },
    { id: 'otro', icon: Package, title: 'OTRO', desc: 'Otro producto personalizado — consúltanos' },
];

const CATEGORIES = [
    'Personalización & Ambiente',
    'Videojuegos (Gaming)',
    'Películas / Series',
    'Deportes',
    'Empresas',
    'Foto Original',
    'Otro'
];

const SIZES = {
    'posavasos': ['Set de 4 (Cuadrados)', 'Set de 4 (Circulares)', 'Set de 6 (Cuadrados)', 'Set de 6 (Circulares)', 'Otro'],
    'mousepad': ['17x21 cm', '19,8x24 cm', 'Otro'],
    'cuadro': ['10x15 cm', '20x28 cm', 'Personalizado'],
    'llaveros': ['Redondo', 'Cuadrado', 'Rectangular', 'Corazón', 'Otro'],
    'id-mascotas': ['Hueso', 'Círculo', 'Corazón', 'Otro'],
    'id-salud': ['Pulsera / Brazalete', 'Medallón / Tag', 'Tarjeta de Cartera', 'Formato Personalizado'],
    'rompecabezas': ['A4 (120 piezas)', 'A5 (30 o 36 piezas)', 'Otro'],
    'tazones': ['11oz Blanco', '11oz Mágico', 'Otro'],
    'tumblers': ['20 oz', '30 oz', 'Otro'],
    'impresion3d': ['PLA', 'ABS', 'Ambos', 'Otro'],
    'otro': ['Consultar tamaño']
};

const API = 'https://s4k.sagason.cl';

const formatPrecio = (n) => n > 0 ? `$${n.toLocaleString('es-CL')}` : 'Consultar';

export function CustomForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        product: '',
        category: '',
        size: ''
    });
    const [precios, setPrecios] = useState({});
    const [nameText, setNameText] = useState('');
    const [messageText, setMessageText] = useState('');

    const [fileName, setFileName] = useState('');
    const [fileUrl, setFileUrl] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [currentOrderId, setCurrentOrderId] = useState('');
    const qrInputRef = useRef(null);

    // Cargar precios de referencia
    useEffect(() => {
        const loadPrecios = async () => {
            let backendPrecios = {};
            try {
                // Ahora lee directo de nuestro backend local (Docker), el cual consulta al ERP
                const res = await fetch('http://localhost:5000/api/prices');
                if (res.ok) {
                    const data = await res.json();
                    if (Object.keys(data).length > 0) backendPrecios = data;
                }
            } catch (e) {
                console.log("No se pudo cargar precios del ERP", e);
            }
            
            let finalPrecios = {};
            // Leer estático como base
            try {
                const res = await fetch('/precios.json');
                if (res.ok) {
                    finalPrecios = await res.json();
                }
            } catch (_) {}

            // Sobrescribir con lo del ERP
            for (const key of Object.keys(backendPrecios)) {
                finalPrecios[key] = backendPrecios[key];
            }
            setPrecios(finalPrecios);
        };
        loadPrecios();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        const form = e.target;
        const orderId = `PED-${Date.now().toString(36).toUpperCase()}`;
        setCurrentOrderId(orderId);
        
        // --- Registro Silencioso en Base de Datos de Ordenes (AWS) ---
        const emailInputForDb = form.querySelector('input[name="email"]');
        const nameInputForDb = form.querySelector('input[name="name"]');
        const phoneInputForDb = form.querySelector('input[name="phone"]');
        const messageInputForDb = form.querySelector('textarea[name="message"]');
        
        if (emailInputForDb && emailInputForDb.value) {
            try {
                // Registro silencioso directo al ERP a través de nuestro backend Node.js
                fetch('http://localhost:5000/api/website-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pedido_id: orderId,
                        email: emailInputForDb.value,
                        name: nameInputForDb ? nameInputForDb.value : 'Sin nombre',
                        phone: phoneInputForDb ? phoneInputForDb.value : 'Sin teléfono',
                        message: messageInputForDb ? messageInputForDb.value : '',
                        product: selections.product,
                        category: selections.category,
                        size: selections.size
                    })
                }).catch(err => console.log("ERP Proxy Log Error:", err));
            } catch (err) {
                console.error("DB Save Error:", err);
            }
        }
        // ----------------------------------------------------------------

        const sendNativeForm = () => {
            form.submit();
            setTimeout(() => {
                setSubmitStatus('success');
                setIsSubmitting(false);
            }, 1000);
        };

        if (['ID SALUD', 'ID MASCOTAS'].includes(selections.product)) {
            try {
                const uniqueId = `SAG-${Date.now().toString(36).toUpperCase()}`;
                const emailInput = form.querySelector('input[name="email"]');
                const userEmail = emailInput ? emailInput.value : '';
                const urlFinal = `https://sagason.cl/sos.html?id=${uniqueId}&mail=${encodeURIComponent(userEmail)}`;
                
                let idInput = form.querySelector('input[name="ID_QR_Asignado"]');
                if (!idInput) {
                    idInput = document.createElement('input');
                    idInput.type = 'hidden';
                    idInput.name = 'ID_QR_Asignado';
                    form.appendChild(idInput);
                }
                idInput.value = uniqueId;

                // Generar QR en formato PNG
                const canvas = document.createElement('canvas');
                await QRCode.toCanvas(canvas, urlFinal, { 
                    width: 400, 
                    margin: 2, 
                    color: { dark: '#000000', light: '#ffffff' }, 
                    errorCorrectionLevel: 'H' 
                });
                
                canvas.toBlob((blob) => {
                    try {
                        if (blob) {
                            const file = new File([blob], `QR_${uniqueId}.png`, { type: 'image/png' });
                            const dt = new DataTransfer();
                            dt.items.add(file);
                            if (qrInputRef.current) {
                                qrInputRef.current.files = dt.files;
                            }
                        }
                        sendNativeForm();
                    } catch (err) {
                        console.error("Error al adjuntar archivo QR", err);
                        sendNativeForm();
                    }
                }, 'image/png');
                
                return;
            } catch (err) {
                console.error("Error al generar QR automático", err);
                setIsSubmitting(false);
                setSubmitStatus('error');
            }
        } else {
            sendNativeForm();
        }
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleSelect = (field, value) => {
        setSelections(prev => ({ ...prev, [field]: value }));
    };

    // Auto-advance: marca la selección visualmente y avanza tras 280ms
    const handleSelectAndAdvance = (field, value) => {
        setSelections(prev => ({ ...prev, [field]: value }));
        setTimeout(() => setStep(prev => prev + 1), 280);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setFileError('El archivo es demasiado grande (> 10MB). Por favor, envía imágenes más pesadas a nuestro correo.');
                setFileName('');
                setFileUrl(null);
                e.target.value = '';
            } else {
                setFileName(file.name);
                setFileUrl(URL.createObjectURL(file));
            }
        } else {
            setFileName('');
            setFileUrl(null);
        }
    };

    const stepsInfo = [
        { id: 1, name: 'Producto' },
        { id: 2, name: 'Categoría' },
        { id: 3, name: 'Características' },
        { id: 4, name: 'Detalles' }
    ];

    /* (useEffect timeout removed to prevent false error messages) */

    if (submitStatus === 'success') {
        const prodId = PRODUCTS.find(p => p.title === selections.product)?.id || 'otro';
        const sizeId = `${prodId}-${selections.size.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.replace(/-+/g, '-').replace(/-$/, '');
        const selectedSku = precios[sizeId]?.sku || '';

        const wpPhone = '56988821357'; 
        const wpMessage = `¡Hola Sagason! Acabo de hacer un pedido y quiero coordinar detalles.\n\n` +
                          `🆔 *Pedido:* ${currentOrderId}\n` +
                          `📦 *Producto:* ${selections.product}\n` +
                          `🏷️ *Categoría:* ${selections.category}\n` +
                          `📏 *Formato:* ${selections.size}\n` +
                          (selectedSku ? `🔢 *SKU:* ${selectedSku}\n` : '') +
                          `\nQuedo atento/a para enviar las imágenes o detalles adicionales.`;
        const whatsappUrl = `https://wa.me/${wpPhone}?text=${encodeURIComponent(wpMessage)}`;

        return (
            <section id="custom" className="custom-section container">
                <div className="section-header">
                    <h2 className="section-title">¡SOLICITUD <span style={{ color: 'var(--color-primary)' }}>ENVIADA!</span></h2>
                    <p className="section-subtitle">Tu pedido ha ingresado exitosamente.</p>
                </div>
                <div className="form-wizard-container">
                    <div className="form-content-panel glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><CheckCircle size={64} /></div>
                        <h3>¡Gracias por preferir Sagason!</h3>
                        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>Hemos recibido tus detalles y archivos. Nos pondremos en contacto contigo prontamente al correo que nos indicaste.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                                Enviar detalles por WhatsApp
                            </a>
                            <button className="btn btn-outline" onClick={() => window.location.reload()} style={{ color: 'var(--color-text)', borderColor: 'var(--border)' }}>Hacer otro pedido</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="custom" className="custom-section container">
            <div className="section-header">
                <p className="section-subtitle">Completa el formulario en 4 simples pasos. <strong>Es una cotización gratuita</strong> — nuestro equipo te contactará con el precio y el diseño.</p>
            </div>

            <div className="form-wizard-container">
                {/* Progress Tracker */}
                <div className="progress-tracker">
                    {stepsInfo.map((s, idx) => (
                        <React.Fragment key={s.id}>
                            <div className={`progress-step ${step >= s.id ? 'active' : ''} ${step === s.id ? 'current' : ''}`}>
                                <div className="step-circle">{s.id}</div>
                                <span className="step-name">{s.name}</span>
                            </div>
                            {idx < stepsInfo.length - 1 && <div className={`progress-line ${step > s.id ? 'active' : ''}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="form-content-panel glass-panel">
                    <iframe name="hidden_iframe" style={{display: "none"}}></iframe>
                    <form action="https://formsubmit.co/sagason@sagason.cl" method="POST" target="hidden_iframe" encType={(fileName || ['ID SALUD', 'ID MASCOTAS'].includes(selections.product)) ? "multipart/form-data" : "application/x-www-form-urlencoded"} onSubmit={handleFormSubmit} className="custom-form">
                        <input type="file" name="qr_code" ref={qrInputRef} style={{display: 'none'}} />
                        <input type="hidden" name="_subject" value="Nuevo Pedido desde Sagason.cl" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_cc" value="brluson@gmail.com,brclflo@gmail.com,gabrielssonoda@gmail.com" />



                        {/* Hidden Inputs to capture steps 1-3 */}
                        <input type="hidden" name="Producto" value={selections.product} />
                        <input type="hidden" name="Categoria" value={selections.category} />
                        <input type="hidden" name="Características" value={selections.size} />

                        <AnimatePresence mode="popLayout">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">¿QUÉ PRODUCTO QUIERES PERSONALIZAR?</h3>
                                    <div className="options-grid products-grid">
                                        {PRODUCTS.map(p => {
                                            const Icon = p.icon;
                                            
                                            // Buscar el precio "Desde" más bajo entre todos los tamaños de este producto
                                            let minPrecio = Infinity;
                                            let notaRef = '';
                                            for (const [key, value] of Object.entries(precios)) {
                                                if (key.startsWith(`${p.id}-`) && value.desde > 0 && value.active !== false) {
                                                    if (value.desde < minPrecio) {
                                                        minPrecio = value.desde;
                                                        notaRef = value.nota;
                                                    }
                                                }
                                            }
                                            const precioMostrar = minPrecio !== Infinity ? { desde: minPrecio, nota: notaRef } : null;

                                            return (
                                                <div
                                                    key={p.id}
                                                    className={`option-card ${selections.product === p.title ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        if (p.id === 'insignias') {
                                                            navigate('/insignia');
                                                            return;
                                                        }
                                                        handleSelectAndAdvance('product', p.title);
                                                    }}
                                                >
                                                    <Icon size={24} className="option-icon" />
                                                    <h4>{p.title}</h4>
                                                    <p>{p.desc}</p>
                                                    {precioMostrar && (
                                                        <span className="precio-desde">
                                                            Desde {formatPrecio(precioMostrar.desde)}
                                                            {precioMostrar.nota ? <em> · {precioMostrar.nota}</em> : null}
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">
                                        {selections.product === 'ID SALUD'
                                            ? '¿QUÉ FORMATO DE FICHA NECESITAS?'
                                            : selections.product === 'IMPRESIÓN 3D'
                                                ? '¿CUÁNTOS COLORES TIENE EL MODELO?'
                                                : '¿QUÉ TIPO DE DISEÑO BUSCAS?'}
                                    </h3>
                                    <div className="options-grid categories-grid">
                                        {(selections.product === 'ID SALUD'
                                            ? ['Salud Impresa', 'Ficha en Código QR', 'Ficha Editable en Línea']
                                            : selections.product === 'IMPRESIÓN 3D'
                                                ? ['1 Color', '2 Colores', '3 Colores']
                                                : CATEGORIES).map(c => (
                                                <div
                                                    key={c}
                                                    className={`option-card simple-card ${selections.category === c ? 'selected' : ''}`}
                                                    onClick={() => handleSelectAndAdvance('category', c)}
                                                >
                                                    <h4>{c}</h4>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="step-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev}>
                                            &larr; Volver
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">
                                        {selections.product === 'IMPRESIÓN 3D' ? '¿QUÉ MATERIAL PREFIERES?' : '¿QUÉ TAMAÑO / FORMATO NECESITAS?'}
                                    </h3>
                                    <p className="step-subtitle-info">{selections.product} &middot; {selections.category}</p>

                                    <div className="options-grid sizes-grid">
                                        {SIZES[PRODUCTS.find(p => p.title === selections.product)?.id || 'otro']
                                            .map(s => {
                                                const prodId = PRODUCTS.find(p => p.title === selections.product)?.id || 'otro';
                                                const sizeId = `${prodId}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.replace(/-+/g, '-').replace(/-$/, '');
                                                const precioSize = precios[sizeId];
                                                
                                                if (precioSize && precioSize.active === false) return null;

                                                return (
                                                    <div
                                                        key={s}
                                                        className={`option-card simple-card ${selections.size === s ? 'selected' : ''}`}
                                                        onClick={() => handleSelectAndAdvance('size', s)}
                                                    >
                                                        <h4>{s.toUpperCase()}</h4>
                                                        {precioSize && precioSize.desde > 0 && (
                                                            <span className="precio-desde" style={{display: 'block', marginTop: '8px', fontSize: '0.85rem', color: 'var(--color-primary)'}}>
                                                                Desde {formatPrecio(precioSize.desde)}
                                                                {precioSize.nota ? <span style={{fontSize: '0.75rem', opacity: 0.8, display:'block'}}>{precioSize.nota}</span> : null}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })
                                            .filter(Boolean)}
                                    </div>
                                    <div className="step-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev}>
                                            &larr; Volver
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                                    {/* STEP 4 */}
                                    {step === 4 && (
                                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                            <h3 className="step-title">TUS DATOS Y DETALLES</h3>
                                            <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }} className="step-subtitle-info">{selections.product} &middot; {selections.category} &middot; {selections.size}</p>

                                            <ProductVisualizer product={selections.product} size={selections.size} name={nameText} details={messageText} fileUrl={fileUrl} />

                                            <div className="fields-grid">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="name">NOMBRE COMPLETO *</label>
                                                    <input type="text" id="name" name="name" className="form-input" required value={nameText} onChange={(e) => setNameText(e.target.value)} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="email">CORREO ELECTRÓNICO *</label>
                                                    <input type="email" id="email" name="email" className="form-input" required />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="phone">TELÉFONO *</label>
                                                    <input type="tel" id="phone" name="phone" className="form-input" required />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label" htmlFor="desc">DETALLES DEL DISEÑO / INSTRUCCIONES</label>
                                                <textarea id="desc" name="message" className="form-textarea" rows="4" value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>
                                            </div>

                                    <div className="form-group">
                                        <label className="form-label">SUBE TU IMAGEN (OPCIONAL)</label>
                                        <div className="file-upload" style={{ position: 'relative' }}>
                                            <input
                                                type="file"
                                                name={fileName ? "attachment" : undefined}
                                                accept="image/png, image/jpeg"
                                                onChange={handleFileChange}
                                                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0, cursor: 'pointer' }}
                                            />
                                            <Upload size={32} style={{ margin: '0 0 0.5rem 0', opacity: fileName ? 1 : 0.7, color: fileName ? 'var(--color-primary)' : 'inherit', display: 'inline-block' }} />
                                            {fileName ? (
                                                <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: '0' }}>{fileName}</p>
                                            ) : (
                                                <p style={{ margin: '0' }}>Haz clic o arrastra tu foto/logo aquí</p>
                                            )}
                                            {fileError && <span style={{ color: '#ff4d4f', fontSize: '0.8rem', display: 'block', marginTop: '8px', fontWeight: 'bold' }}>{fileError}</span>}
                                        </div>
                                    </div>

                                    {/* Precio referencial */}
                                    {(() => {
                                        const prodId = PRODUCTS.find(p => p.title === selections.product)?.id;
                                        if (!prodId) return null;
                                        const sizeId = `${prodId}-${(selections.size || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.replace(/-+/g, '-').replace(/-$/, '');
                                        const precio = precios[sizeId];
                                        if (!precio || precio.desde <= 0) return null;
                                        
                                        return (
                                            <div className="precio-referencia-box">
                                                <div className="precio-ref-header">
                                                    <span>💰</span>
                                                    <strong>Precio Referencial</strong>
                                                </div>
                                                <div className="precio-ref-body">
                                                    <span className="precio-ref-producto">{selections.product} - {selections.size}</span>
                                                    <span className="precio-ref-valor">
                                                        Desde {formatPrecio(precio.desde)}
                                                        {precio.nota ? <span className="precio-ref-nota"> ({precio.nota})</span> : null}
                                                    </span>
                                                </div>
                                                <p className="precio-ref-disclaimer">⚠ Este valor es orientativo. El precio final depende de la cantidad, materiales y detalles de tu pedido. Nuestro equipo te confirmará el valor exacto.</p>
                                            </div>
                                        );
                                    })()}

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: '8px', padding: '12px 14px', marginBottom: '1.25rem' }}>
                                        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💬</span>
                                        <p style={{ margin: 0, fontSize: '0.82rem', color: '#93c5fd', lineHeight: '1.5' }}>
                                            <strong style={{ color: '#bfdbfe' }}>Esto es una cotización sin costo.</strong> Nuestro equipo comercial evaluará tu solicitud y te informará el valor y los tiempos de producción a la brevedad.
                                        </p>
                                    </div>
                                    <div className="step-actions dual-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev} disabled={isSubmitting}>
                                            &larr; Volver
                                        </button>
                                        <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                            {isSubmitting ? (
                                                <span>Enviando...</span>
                                            ) : (
                                                <><Send size={18} /> Enviar Cotización</>
                                            )}
                                        </button>
                                    </div>

                                    {submitStatus === 'error' && (
                                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 77, 79, 0.1)', border: '1px solid #ff4d4f', borderRadius: '4px', textAlign: 'center' }}>
                                            <p style={{ color: '#ff4d4f', margin: 0, fontWeight: 'bold' }}>Hubo un error al procesar tu archivo.</p>
                                            <p style={{ color: 'white', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Nuestro servidor tuvo problemas con la foto adjunta. Por favor, <strong>envía tu formulario sin la foto</strong> y luego envíanos la imagen directamente a <a href="mailto:sagason@sagason.cl" style={{ color: 'var(--color-primary)' }}>sagason@sagason.cl</a>.</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
}

// 🎨 ProductVisualizer - Wrapper para el nuevo visor 3D universal
function ProductVisualizer({ product, size, name, details, fileUrl }) {
    const prodId = product?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'otro';
    
    // Determinar tipo de decoración y descripción
    let decorType = 'SUBLIMACIÓN TÉRMICA 4K';
    let decorDesc = 'Simulación fotorrealista del acabado sublimado sobre superficie premium.';
    
    if (['llaveros', 'id-mascotas', 'id-salud', 'tumblers', 'insignias'].some(p => prodId.includes(p))) {
        decorType = 'GRABADO MICRO-LÁSER 4K';
        decorDesc = 'Simulación fotorrealista de grabado láser de fibra de precisión a 1064nm.';
    } else if (prodId.includes('impresion3d')) {
        decorType = 'FABRICACIÓN ADITIVA 3D';
        decorDesc = 'Simulación de extrusión por capas en filamento biodegradable premium.';
    }

    const use2DMockup = ['tazones', 'rompecabezas', 'tumblers'].some(p => prodId.includes(p));
    const isOtro = prodId === 'otro';

    return (
        <div className="visualizer-container-3d" style={{ padding: '0', background: 'transparent' }}>
            <span className="visualizer-badge-3d" style={{ marginBottom: '10px' }}>
                <span>⚡</span> {decorType}
            </span>
            
            {isOtro ? (
                <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', position: 'relative' }}>
                    <img src="/products-composition.png" alt="Productos Personalizados" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '8px' }}>
                        <span style={{ background: 'var(--color-primary)', color: '#000', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
                            MÚLTIPLES PRODUCTOS
                        </span>
                    </div>
                </div>
            ) : use2DMockup ? (
                <Mockup2DViewer product={product} fileUrl={fileUrl} />
            ) : (
                <Universal3DViewer 
                    product={product} 
                    category={prodId} 
                    size={size} 
                    name={name || details}
                    textureUrl={fileUrl}
                />
            )}
            
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '20px', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4', maxWidth: '260px', display: 'inline-block' }}>
                {decorDesc}
            </span>
        </div>
    );
}

