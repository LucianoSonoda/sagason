import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import '../styles/CustomForm.css';

export function CustomForm() {
    const [requestType, setRequestType] = useState('custom'); // 'original' or 'custom'
    const [category, setCategory] = useState('Juegos');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.');
    };

    return (
        <section id="custom" className="custom-section container">
            <div className="section-header">
                <h2 className="section-title">Personaliza tu Placa</h2>
                <p>¿Foto original o diseño exclusivo? Tú eliges.</p>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Contact Info */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nombre Completo</label>
                        <input type="text" id="name" className="form-input" required placeholder="Tu nombre" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" className="form-input" required placeholder="tu@email.com" />
                    </div>

                    {/* Request Type Selection */}
                    <div className="form-group">
                        <label className="form-label">Tipo de Solicitud</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="type"
                                    value="custom"
                                    className="radio-input"
                                    checked={requestType === 'custom'}
                                    onChange={(e) => setRequestType(e.target.value)}
                                />
                                Diseño Temático
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="type"
                                    value="original"
                                    className="radio-input"
                                    checked={requestType === 'original'}
                                    onChange={(e) => setRequestType(e.target.value)}
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
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Juegos">Videojuegos (Gaming)</option>
                                <option value="Películas">Películas / Series</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <label className="form-label" htmlFor="desc" style={{ marginTop: '1rem' }}>Detalles del Diseño</label>
                            <textarea
                                id="desc"
                                className="form-textarea"
                                rows="4"
                                placeholder="Describe el personaje, escena o equipo que quieres en tu placa..."
                            ></textarea>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label className="form-label">Sube tu Imagen</label>
                            <div className="file-upload">
                                <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
                                <p>Arrastra tu foto aquí o haz clic para subir</p>
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
