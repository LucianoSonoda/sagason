import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, Coffee, Mouse, Image as ImageIcon, Key, Dog, Heart, Puzzle, CupSoda, Package } from 'lucide-react';
import '../styles/CustomForm.css';

const PRODUCTS = [
    { id: 'posavasos', icon: Coffee, title: 'POSAVASOS', desc: 'Set de posavasos personalizados' },
    { id: 'mousepad', icon: Mouse, title: 'MOUSEPAD', desc: 'Mousepad sublimado de alta resolución' },
    { id: 'cuadro', icon: ImageIcon, title: 'CUADRO HD', desc: 'Cuadro en metal con impresión en alta definición' },
    { id: 'llaveros', icon: Key, title: 'LLAVEROS', desc: 'Llaveros sublimados personalizados' },
    { id: 'id-mascotas', icon: Dog, title: 'ID MASCOTAS', desc: 'Identificación metálica personalizada para tu mascota' },
    { id: 'id-salud', icon: Heart, title: 'ID SALUD', desc: 'Identificación de enfermedades y alergias' },
    { id: 'rompecabezas', icon: Puzzle, title: 'ROMPECABEZAS', desc: 'Rompecabezas con tu foto o diseño' },
    { id: 'tazones', icon: Coffee, title: 'TAZONES', desc: 'Tazones sublimados personalizados' },
    { id: 'tumblers', icon: CupSoda, title: 'TUMBLERS', desc: 'Tumbler / vaso térmico personalizado' },
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
    'posavasos': ['Set de 4', 'Set de 6', 'Otro'],
    'mousepad': ['17x21 cm', '19,8x24 cm', 'Otro'],
    'cuadro': ['10x15 cm', '20x28 cm', 'Personalizado'],
    'llaveros': ['Redondo', 'Cuadrado', 'Rectangular', 'Corazón', 'Otro'],
    'id-mascotas': ['Hueso', 'Círculo', 'Corazón', 'Otro'],
    'id-salud': ['Pulsera / Brazalete', 'Medallón / Tag', 'Tarjeta de Cartera', 'Formato Personalizado'],
    'rompecabezas': ['A4 (120 piezas)', 'A5 (30 o 36 piezas)', 'Otro'],
    'tazones': ['11oz Blanco', '11oz Mágico', 'Otro'],
    'tumblers': ['20 oz', '30 oz', 'Otro'],
    'otro': ['Consultar tamaño']
};

export function CustomForm() {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        product: '',
        category: '',
        size: ''
    });

    const [fileName, setFileName] = useState('');
    const [fileError, setFileError] = useState('');

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleSelect = (field, value) => {
        setSelections(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setFileError('El archivo es demasiado grande (> 10MB). Por favor, envía imágenes más pesadas a nuestro correo.');
                setFileName('');
                e.target.value = '';
            } else {
                setFileName(file.name);
            }
        } else {
            setFileName('');
        }
    };

    const stepsInfo = [
        { id: 1, name: 'Producto' },
        { id: 2, name: 'Categoría' },
        { id: 3, name: 'Tamaño' },
        { id: 4, name: 'Detalles' }
    ];

    return (
        <section id="custom" className="custom-section container">
            <div className="section-header">
                <p className="section-subtitle">Completa el formulario en 4 simples pasos y te contactaremos con el diseño.</p>
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
                    <form action="https://formsubmit.co/ventas@sagason.cl" method="POST" encType="multipart/form-data">
                        <input type="hidden" name="_subject" value="Nuevo Pedido desde Sagason.cl" />
                        <input type="hidden" name="_next" value="https://sagason.cl" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_cc" value="brluson@gmail.com,brclflo@gmail.com,gabrielssonoda@gmail.com" />

                        {/* Hidden Inputs to capture steps 1-3 */}
                        <input type="hidden" name="Producto" value={selections.product} />
                        <input type="hidden" name="Categoria" value={selections.category} />
                        <input type="hidden" name="Tamaño" value={selections.size} />

                        <AnimatePresence mode="wait">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">¿QUÉ PRODUCTO QUIERES PERSONALIZAR?</h3>
                                    <div className="options-grid products-grid">
                                        {PRODUCTS.map(p => {
                                            const Icon = p.icon;
                                            return (
                                                <div
                                                    key={p.id}
                                                    className={`option-card ${selections.product === p.title ? 'selected' : ''}`}
                                                    onClick={() => handleSelect('product', p.title)}
                                                >
                                                    <Icon size={24} className="option-icon" />
                                                    <h4>{p.title}</h4>
                                                    <p>{p.desc}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="step-actions">
                                        <button type="button" className="btn-next" disabled={!selections.product} onClick={handleNext}>
                                            Siguiente &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">
                                        {selections.product === 'ID SALUD'
                                            ? '¿QUÉ FORMATO DE FICHA NECESITAS?'
                                            : '¿QUÉ TIPO DE DISEÑO BUSCAS?'}
                                    </h3>
                                    <div className="options-grid categories-grid">
                                        {(selections.product === 'ID SALUD'
                                            ? ['Salud Impresa', 'Ficha en Código QR', 'Ficha Editable en Línea']
                                            : CATEGORIES).map(c => (
                                                <div
                                                    key={c}
                                                    className={`option-card simple-card ${selections.category === c ? 'selected' : ''}`}
                                                    onClick={() => handleSelect('category', c)}
                                                >
                                                    <h4>{c}</h4>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="step-actions dual-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev}>
                                            &larr; Volver
                                        </button>
                                        <button type="button" className="btn-next" disabled={!selections.category} onClick={handleNext}>
                                            Siguiente &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">¿QUÉ TAMAÑO / FORMATO NECESITAS?</h3>
                                    <p className="step-subtitle-info">{selections.product} &middot; {selections.category}</p>

                                    <div className="options-grid sizes-grid">
                                        {SIZES[PRODUCTS.find(p => p.title === selections.product)?.id || 'otro'].map(s => (
                                            <div
                                                key={s}
                                                className={`option-card simple-card ${selections.size === s ? 'selected' : ''}`}
                                                onClick={() => handleSelect('size', s)}
                                            >
                                                <h4>{s.toUpperCase()}</h4>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="step-actions dual-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev}>
                                            &larr; Volver
                                        </button>
                                        <button type="button" className="btn-next" disabled={!selections.size} onClick={handleNext}>
                                            Siguiente &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <h3 className="step-title">TUS DATOS Y DETALLES</h3>
                                    <p className="step-subtitle-info">{selections.product} &middot; {selections.category} &middot; {selections.size}</p>

                                    <div className="fields-grid">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">NOMBRE COMPLETO *</label>
                                            <input type="text" id="name" name="name" className="form-input" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">CORREO ELECTRÓNICO *</label>
                                            <input type="email" id="email" name="email" className="form-input" required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="desc">DETALLES DEL DISEÑO / INSTRUCCIONES</label>
                                        <textarea id="desc" name="message" className="form-textarea" rows="4"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">SUBE TU IMAGEN (OPCIONAL)</label>
                                        <div className="file-upload" style={{ position: 'relative' }}>
                                            <input
                                                type="file"
                                                name="attachment"
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

                                    <div className="step-actions dual-actions">
                                        <button type="button" className="btn-prev" onClick={handlePrev}>
                                            &larr; Volver
                                        </button>
                                        <button type="submit" className="submit-btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                            <Send size={18} /> Enviar Solicitud
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
}
