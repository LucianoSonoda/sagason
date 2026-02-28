import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import '../styles/CustomForm.css';

export function CustomForm() {
    const [category, setCategory] = useState('Juegos');
    const [fileName, setFileName] = useState('');

    return (
        <section id="custom" className="custom-section container">
            <div className="section-header">
                <h2 className="section-title">Personaliza tu Placa</h2>
                <p>¿Foto original o diseño exclusivo? Tú eliges.</p>
            </div>

            <div className="form-container">
                {/* Formspree / Form endpoint: Reemplazar el action con tu link de Formspree */}
                <form action="https://formspree.io/f/xreadwbo" method="POST" encType="multipart/form-data">

                    <input type="hidden" name="_subject" value="Nuevo Pedido desde Sagason.cl" />
                    <input type="hidden" name="_next" value="https://sagason.cl" />
                    <input type="hidden" name="_language" value="es" />

                    {/* Contact Info */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nombre Completo</label>
                        <input type="text" id="name" name="name" className="form-input" required placeholder="Tu nombre" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" className="form-input" required placeholder="tu@email.com" />
                    </div>

                    {/* Selection and Inputs */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="category">Categoría o Tipo</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Juegos">Videojuegos (Gaming)</option>
                            <option value="Películas">Películas / Series</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Empresas">Empresas</option>
                            <option value="Foto Original">Foto Original</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="desc">Detalles del Diseño / Instrucciones</label>
                        <textarea
                            id="desc"
                            name="message"
                            className="form-textarea"
                            rows="4"
                            placeholder="Describe cómo quieres tu placa (ej. escena a sublimar, colores o detalles de tu foto)..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Sube tu Imagen (Opcional si es un Diseño Temático general)</label>
                        <div className="file-upload" style={{ position: 'relative' }}>
                            <input
                                type="file"
                                name="attachment"
                                accept="image/png, image/jpeg"
                                onChange={(e) => setFileName(e.target.files[0] ? e.target.files[0].name : '')}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0,
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                            <Upload size={32} style={{ marginBottom: '0.5rem', opacity: fileName ? 1 : 0.7, color: fileName ? 'var(--color-primary)' : 'inherit' }} />
                            {fileName ? (
                                <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: '0.5rem 0' }}>{fileName}</p>
                            ) : (
                                <p>Haz clic o arrastra tu foto/logo aquí</p>
                            )}
                            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Formatos: JPG, PNG (Max 10MB)</span>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        Enviar Solicitud <Send size={18} />
                    </button>
                </form>
            </div>
        </section>
    );
}
