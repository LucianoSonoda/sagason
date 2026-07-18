import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Puzzle, ArrowRight, Upload, Image as ImageIcon } from 'lucide-react';
import { Mockup2DViewer } from '../components/Mockup2DViewer';
import { CheckoutExtras } from '../components/CheckoutExtras';
import { ProductGallery } from '../components/ProductGallery';
import { useSEO } from '../hooks/useSEO';
import { compressImage } from '../utils/imageCompressor';

import '../styles/Home.css';

export default function Rompecabezas() {
    useSEO({
        title: 'Rompecabezas Personalizados | Sagason SpA',
        description: 'Convierte tus fotos favoritas en rompecabezas personalizados. Regalo perfecto y original impreso con sublimación de alta calidad.',
        keywords: 'rompecabezas personalizado, puzzle con foto, regalo original, rompecabezas sublimado, Sagason, Chile',
        canonicalPath: '/rompecabezas'
    });

    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileDataUrl, setFileDataUrl] = useState(null);
    const [category, setCategory] = useState('Personalización & Ambiente');
    const [size, setSize] = useState('A4 (120 piezas)');
    
    const [totalPrice, setTotalPrice] = useState(12990);
    const { addToCart, setIsDrawerOpen } = useCart();
    const [checkoutData, setCheckoutData] = useState({});

    const CATEGORIES = [
        'Personalización & Ambiente',
        'Videojuegos (Gaming)',
        'Películas / Series',
        'Deportes',
        'Empresas',
        'Foto Original',
        'Otro'
    ];
    
    const SIZES = ['A4 (120 piezas)', 'A5 (30 o 36 piezas)', 'Otro'];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileUrl(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => setFileDataUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddToCart = () => {
        const cartItem = {
            productId: Date.now().toString(),
            name: 'Rompecabezas Personalizado', 
            price: totalPrice || 0,
            quantity: 1,
            options: typeof checkoutData !== 'undefined' ? checkoutData : {}
        };
        addToCart(cartItem);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setIsDrawerOpen(true);
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
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>REGALOS ORIGINALES</span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Arma Tus <span className="text-gradient">Mejores Recuerdos</span></h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-dim)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Un rompecabezas con tu fotografía favorita es el regalo perfecto. Utilizamos sublimación térmica para asegurar piezas con colores vivos que no se desvanecen con el tiempo.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {/* Configurator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Puzzle size={24} color="var(--color-primary)" />
                                    Crea tu Rompecabezas
                                </h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Categoría / Temática</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Tamaño / Piezas</label>
                                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Sube tu Fotografía</label>
                                    <div className="file-upload" style={{ position: 'relative', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px dashed var(--color-primary)', textAlign: 'center' }}>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0, cursor: 'pointer' }}
                                        />
                                        <Upload size={24} style={{ margin: '0 auto 0.5rem auto', color: fileName ? 'var(--color-primary)' : 'inherit' }} />
                                        {fileName ? (
                                            <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: '0', fontSize: '0.9rem' }}>{fileName}</p>
                                        ) : (
                                            <p style={{ margin: '0', fontSize: '0.9rem' }}>Haz clic o arrastra tu foto aquí</p>
                                        )}
                                    </div>
                                </div>

                                <CheckoutExtras hideUpload={true} 
                                    basePrice={12990} 
                                    onTotalChange={(newTotal) => setTotalPrice(newTotal)} 
                                    onDataChange={(data) => setCheckoutData(data)}
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>${totalPrice.toLocaleString('es-CL')}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button 
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="btn btn-secondary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', border: '1px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', borderRadius: '8px' }}
                                    >
                                        Agregar al Carrito
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="btn btn-primary" 
                                        style={{ flex: 1, padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px', color: 'white', background: 'var(--color-primary)', border: 'none' }}
                                    >
                                        Comprar Ahora
                                    </button>
                                </div>
                                {!fileUrl && <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#ff4d4f', marginTop: '1rem' }}>Por favor sube una imagen para continuar.</p>}
                            </div>
                        </div>

                        {/* Viewer */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Vista Previa</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>Simulación 2D del corte de piezas sobre tu fotografía.</p>
                            
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Mockup2DViewer product="rompecabezas" fileUrl={fileUrl} />
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                    <ImageIcon size={24} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem' }}>Acabado Brillante</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>Superficie esmaltada que resalta el contraste y facilita el encaje de las piezas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProductGallery category="ROMPECABEZAS" />
                </motion.div>
            </section>
        </div>
    );
}





