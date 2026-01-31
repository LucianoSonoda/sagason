import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import '../styles/CustomForm.css';

export function CustomForm() {
    const [requestType, setRequestType] = useState('custom'); // 'original' or 'custom'
    const [category, setCategory] = useState('Juegos');

    return (
        <section id="custom" className="custom-section container">
            <div className="section-header">
                <h2 className="section-title">Personaliza tu Placa</h2>
                <p>¿Foto original o diseño exclusivo? Tú eliges.</p>
            </div>

            <div className="form-container">
                {/* Formspree Configuration: action points to the email */}
                <form action="https://formspree.io/f/xpwazqrl" method="POST" encType="multipart/form-data">
                    {/* Fallback to generic action if ID not provided, but best to use dynamic or specific ID. 
               Since I don't have the user's ID, I will use the direct email trick which alerts them to set it up 
               OR ideally, I should instruct them to putting their real ID.
               Actually, pointing to https://formspree.io/ventas@sagason.cl is the classic way. 
               Let's use that.
           */}
                </form>
                {/* Retrying with the full correct replacement content */}
                <form action="https://formspree.io/ventas@sagason.cl" method="POST" encType="multipart/form-data">

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

                    {/* Request Type Selection */}
                    <div className="form-group">
                        <label className="form-label">Tipo de Solicitud</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="request_type"
                                    value="Diseño Temático"
                                    className="radio-input"
                                    checked={requestType === 'custom'}
                                    onChange={() => setRequestType('custom')}
                                />
                                Diseño Temático
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="request_type"
                                    value="Foto Original"
                                    className="radio-input"
                                    checked={requestType === 'original'}
                                    onChange={() => setRequestType('original')}
                                />
                                Foto Original
                            </label>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {requestType === 'custom' ? (
                        <div className="form-group">
                            <label className="form-label" htmlFor="category">Categoría</label>
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
                                <option value="Otro">Otro</option>
                            </select>

                            <label className="form-label" htmlFor="desc" style={{ marginTop: '1rem' }}>Detalles del Diseño</label>
                            <textarea
                                id="desc"
                                name="message"
                                className="form-textarea"
                                rows="4"
                                placeholder="Describe el personaje, escena o equipo que quieres en tu placa..."
                            ></textarea>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label className="form-label">Sube tu Imagen</label>
                            <div className="file-upload" style={{ position: 'relative' }}>
                                <input
                                    type="file"
                                    name="attachment"
                                    accept="image/png, image/jpeg"
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
                                <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
                                <p>Haz clic o arrastra tu foto aquí</p>
                                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Formatos: JPG, PNG (Max 10MB)</span>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        Enviar Solicitud <Send size={18} />
                    </button>
                </form>
            </div>
        </section>
    );
}
