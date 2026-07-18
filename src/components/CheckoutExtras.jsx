import React, { useState, useEffect } from 'react';
import { compressImage } from '../utils/imageCompressor';
import { Truck, Sparkles, MessageSquare, Package } from 'lucide-react';

export const CheckoutExtras = ({ basePrice = 0, packagingPrice = 4000, onTotalChange, onDataChange }) => {
        const [customer_name, setCustomerName] = useState('');
    const [customer_rut, setCustomerRut] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_address, setCustomerAddress] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [customInstructions, setCustomInstructions] = useState('');
    const [useAIArt, setUseAIArt] = useState(false);
    const [useCustomPackaging, setUseCustomPackaging] = useState(false);
    const [shippingRegion, setShippingRegion] = useState('metropolitana');
    const [attachedFile, setAttachedFile] = useState(null);
    const [attachedFileName, setAttachedFileName] = useState('');

    const REGIONES = [
        { id: 'retiro', name: 'Retiro en Taller (Vitacura) - $0', cost: 0 },
        { id: 'metropolitana', name: 'Región Metropolitana - $3.100', cost: 3100 },
        { id: 'normal', name: 'Otras Regiones - $4.300', cost: 4300 },
        { id: 'extrema', name: 'Regiones Extremas (Arica, Tarapacá, Aysén, Magallanes) - $5.200', cost: 5200 }
    ];

    useEffect(() => {
        const shippingCost = REGIONES.find(r => r.id === shippingRegion)?.cost || 0;
        const aiCost = useAIArt ? 5000 : 0;
        const packagingCost = useCustomPackaging ? packagingPrice : 0;
        const total = basePrice + shippingCost + aiCost + packagingCost;
        
        if (onTotalChange) {
            onTotalChange(total);
        }

        if (onDataChange) {
                        onDataChange({
                customer_name,
                customer_rut,
                customer_email,
                customer_address,
                customer_phone,
                customInstructions,
                useAIArt,
                useCustomPackaging,
                shippingRegion,
                totalPrice: total,
                attachedFile,
                attachedFileName
            });
        }
    }, [basePrice, useAIArt, shippingRegion, useCustomPackaging, packagingPrice, customInstructions, attachedFile, attachedFileName, customer_name, customer_rut, customer_email, customer_address, customer_phone]);

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
            
                        {/* Datos de Contacto (Obligatorios) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                    <MessageSquare size={18} /> Datos de Contacto (Obligatorios)
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>Nombre Completo *</label>
                        <input type="text" value={customer_name} onChange={(e) => setCustomerName(e.target.value)} placeholder="Ej: Juan Pérez" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>RUT / Pasaporte *</label>
                        <input type="text" value={customer_rut} onChange={(e) => setCustomerRut(e.target.value)} placeholder="Ej: 12.345.678-9" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>Correo Electrónico *</label>
                        <input type="email" value={customer_email} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Ej: juan@correo.com" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>Teléfono / WhatsApp *</label>
                        <input type="text" value={customer_phone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Ej: +56 9 1234 5678" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>Dirección de Envío completa *</label>
                    <input type="text" value={customer_address} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Calle, Número, Depto, Comuna, Ciudad" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                </div>
            </div>

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

            {/* Envío */}
            <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                    <Truck size={16} /> Envío vía Blue Express
                </label>
                <select 
                    value={shippingRegion} 
                    onChange={(e) => setShippingRegion(e.target.value)} 
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        background: 'rgba(255,255,255,0.08)', 
                        color: 'white' 
                    }}
                >
                    {REGIONES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
            </div>

        </div>
    );
};


