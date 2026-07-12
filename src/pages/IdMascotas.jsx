import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Dog, CheckCircle } from 'lucide-react';
import { Universal3DViewer } from '../components/Universal3DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import '../styles/Home.css'; 

export default function IdMascotas() {
    useSEO({
        title: 'ID Mascotas con Código QR | Sagason SpA',
        description: 'Placas de identificación para mascotas con tecnología QR. Si tu mascota se pierde, quien la encuentre podrá ver su perfil y contactarte al instante sin usar apps.',
        keywords: 'placas mascotas, identificacion mascotas, placa qr perro, placa qr gato, Sagason, Chile',
        canonicalPath: '/id-mascotas'
    });

    const [petName, setPetName] = useState('');
    const [category, setCategory] = useState('Personalización & Ambiente');
    const [size, setSize] = useState('Hueso');
    const [material, setMaterial] = useState('aluminio');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [totalPrice, setTotalPrice] = useState(9599);

    const MATERIALS = [
        { id: 'aluminio', name: 'Aluminio Sublimado', price: 9599 },
        { id: 'acero', name: 'Acero Inox. Grabado Láser', price: 10899 }
    ];

    const basePrice = MATERIALS.find(m => m.id === material).price;

    const CATEGORIES = [
        'Personalización & Ambiente',
        'Videojuegos (Gaming)',
        'Películas / Series',
        'Deportes',
        'Empresas',
        'Foto Original',
        'Otro'
    ];
    
    const SIZES = ['Hueso', 'Círculo', 'Corazón', 'Otro'];

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulated checkout flow
        setTimeout(() => {
            alert('Redirigiendo a Webpay Plus / Flow para pago seguro...');
            setIsCheckingOut(false);
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={containerVariants}
                    className="glass-panel"
                    style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>PROTECCIÓN ACTIVA</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>El Vínculo Que <span className="text-gradient">Nunca Se Rompe</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Nuestras placas de ID para mascotas están disponibles en aluminio sublimado a todo color o grabadas en láser sobre acero inoxidable. Si tu mejor amigo se pierde, un simple escaneo revelará su perfil de emergencia. Sin baterías, sin apps.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Dog size={24} color="var(--color-primary)" />
                                    Personaliza su Placa
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Nombre de tu Mascota</label>
                                    <input 
                                        type="text" 
                                        value={petName}
                                        onChange={(e) => setPetName(e.target.value)}
                                        placeholder="Ej: Max"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Categoría / Diseño</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Formato de Placa</label>
                                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Material y Acabado</label>
                                    <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '0.5rem' }}>Características Incluidas:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                            <CheckCircle size={16} color="var(--color-primary)" /> 
                                            {material === 'aluminio' ? 'Impresión Sublimada a Todo Color' : 'Grabado Láser Permanente'}
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><CheckCircle size={16} color="var(--color-primary)" /> Panel de Control de Datos</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><CheckCircle size={16} color="var(--color-primary)" /> QR Escaneable Universalmente</li>
                                    </ul>
                                </div>

                                <CheckoutExtras 
                                    basePrice={basePrice} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
                                >
                                    {isCheckingOut ? 'Cargando...' : <>Comprar Ahora (Pago Seguro) <ArrowRight size={20} /></>}
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '1rem' }}>
                                    Pagos procesados por Webpay / Flow
                                </p>
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Vista Previa en Tiempo Real</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', margin: '0 0 1rem 0' }}>
                                Así se verá tu placa en la realidad (versión simulada).
                            </p>
                            
                            <Universal3DViewer 
                                product="id-mascotas" 
                                category="metal"
                                size={size.toLowerCase()}
                                name={petName || 'TU MASCOTA'}
                            />

                            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Shield size={24} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>Privacidad Total</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Tú decides qué información mostrar. Puedes actualizarla en cualquier momento desde tu panel, sin tener que cambiar la placa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="ID MASCOTAS" />
                </motion.div>
            </section>
        </div>
    );
}
