import React, { useState, useEffect } from 'react';
import { compressImage } from '../utils/imageCompressor';
import { Sparkles, MessageSquare, Package } from 'lucide-react';

export const CheckoutExtras = ({ basePrice = 0, packagingPrice = 4000, onTotalChange, onDataChange, hideUpload = false }) => {
    const [customInstructions, setCustomInstructions] = useState('');
    const [useAIArt, setUseAIArt] = useState(false);
    const [useCustomPackaging, setUseCustomPackaging] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [attachedFileName, setAttachedFileName] = useState('');

    useEffect(() => {
        const aiCost = useAIArt ? 5000 : 0;
        const packagingCost = useCustomPackaging ? packagingPrice : 0;
        const total = basePrice + aiCost + packagingCost;
        
        if (onTotalChange) {
            onTotalChange(total);
        }

        if (onDataChange) {
            onDataChange({
                customInstructions,
                useAIArt,
                useCustomPackaging,
                totalPrice: total,
                attachedFile,
                attachedFileName
            });
        }
    }, [basePrice, useAIArt, useCustomPackaging, packagingPrice, customInstructions, attachedFile, attachedFileName]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachedFileName(file.name);
            compressImage(file).then(base64 => setAttachedFile(base64)).catch(console.error);
        } else {
            setAttachedFile(null);
            setAttachedFileName('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
            
            {/* Instrucciones Adicionales */}
            <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                    <MessageSquare size={16} /> Instrucciones Adicionales
                </label>
                <textarea 
                    rows="3"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="Escribe aquí si tienes alguna petición especial para tu diseño..."
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        background: 'rgba(255,255,255,0.08)', 
                        color: 'white',
                        resize: 'vertical'
                    }}
                ></textarea>
            </div>

            {/* Adjuntar Archivo */}
            {!hideUpload && (
            <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                    <Sparkles size={16} /> Adjuntar Imagen/Diseño (Opcional)
                </label>
                <input 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        border: '1px dashed rgba(255,255,255,0.3)', 
                        background: 'rgba(255,255,255,0.05)', 
                        color: 'white',
                        cursor: 'pointer'
                    }}
                />
            </div>
            )}

            {/* Arte con IA */}
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '1rem', 
                    background: useAIArt ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255,255,255,0.03)', 
                    border: `1px solid ${useAIArt ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onClick={() => setUseAIArt(!useAIArt)}
            >
                <input 
                    type="checkbox" 
                    checked={useAIArt}
                    readOnly
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                        <Sparkles size={16} color="var(--color-primary)" />
                        Arte Personalizado con IA (+ $5.000)
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                        Nuestros diseñadores utilizarán IA avanzada para crear una ilustración única basándose en tu idea.
                    </p>
                    {useAIArt && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: '#ffb300', fontStyle: 'italic' }}>
                            * Nota: Dependiendo de la complejidad de la solicitud, el precio podría variar o la solicitud podría ser rechazada.
                        </p>
                    )}
                </div>
            </div>

            {/* Embalaje Customizado */}
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '1rem', 
                    background: useCustomPackaging ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255,255,255,0.03)', 
                    border: `1px solid ${useCustomPackaging ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onClick={() => setUseCustomPackaging(!useCustomPackaging)}
            >
                <input 
                    type="checkbox" 
                    checked={useCustomPackaging}
                    readOnly
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                        <Package size={16} color="var(--color-primary)" />
                        Embalaje Customizado (+ ${packagingPrice.toLocaleString('es-CL')})
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                        Caja de regalo personalizada y protección premium para una experiencia de unboxing inolvidable.
                    </p>
                </div>
            </div>

        </div>
    );
};
