import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Gallery.css';
import { ChileanHamburger } from './ChileanHamburger';

import logoCompleto from '../assets/logo-completo.jpg';
import imgCastillo from '../assets/Castilloconbrillo.jpeg';
import imgAluminio1 from '../assets/Cuador Aluminio1.jpeg';
import imgAluminio5 from '../assets/Cuador Aluminio5.jpeg';
import imgAluminio6 from '../assets/Cuador Aluminio6.jpeg';
import imgCuadroMujeres from '../assets/Cuadro dia de las mujeres.png';
import imgMousepad from '../assets/MousePad_StarryNight.png';
import imgPlacaBailey from '../assets/Placa identificación Bailey_upscayl_3x_upscayl-standard-4x.png';
import imgStrangerThings from '../assets/stranger_things.png';
import imgEstrela from '../assets/estrela.png';
import imgMujeres from '../assets/mujeres.jpeg';
import imgPerro from '../assets/perro.jpg';
import imgTazonMujeres from '../assets/tazon DIa de las mujeres.png';
import imgPlacasMascotas from '../assets/placas_mascotas_kiara_perla.jpg';
import imgImpresionEngranaje from '../assets/impresion3d_engranaje.jpg';
import imgImpresionOruga from '../assets/impresion3d_oruga.jpg';

const CATEGORIES = [
    { title: 'TAZONES', color: '#a21caf', image: imgTazonMujeres },
    { title: 'TUMBLERS', color: '#0f766e' },
    { title: 'MOUSEPAD', color: '#1d4ed8', image: imgMousepad },
    { title: 'CUADRO HD', color: '#b91c1c', image: imgAluminio1 },
    { title: 'POSAVASOS', color: '#c2410c' },
    { title: 'BOLSAS', color: '#7c3aed' },
    { title: 'ROMPECABEZAS', color: '#4338ca' },
    { title: 'AZULEJOS', color: '#0369a1' },
    { title: 'BOTELLAS', color: '#047857' },
    { title: 'LLAVEROS', color: '#b45309' },
    { title: 'ID MASCOTAS', color: '#d97706', image: imgPlacaBailey },
    { title: 'ID SALUD', color: '#be185d' },
    { title: 'IMPRESIÓN 3D', color: '#ea580c', image: imgImpresionOruga },
    { title: 'CORPORATIVO / OTRO', color: '#1D4ED8', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

const ITEMS = [
    // Cuadros HD
    { id: 1,  title: 'Cuadro Aluminio HD',      category: 'CUADRO HD',         color: '#b91c1c', image: imgAluminio1 },
    { id: 2,  title: 'Edición Especial',         category: 'CUADRO HD',         color: '#b91c1c', image: imgAluminio5 },
    { id: 3,  title: 'Placa con Brillo',         category: 'CUADRO HD',         color: '#b91c1c', image: imgAluminio6 },
    { id: 4,  title: 'Castillo y Magia',         category: 'CUADRO HD',         color: '#b91c1c', image: imgCastillo },
    { id: 5,  title: 'Cuadro Día de la Mujer',   category: 'CUADRO HD',         color: '#b91c1c', image: imgCuadroMujeres },
    { id: 6,  title: 'Diseño Mujeres',           category: 'CUADRO HD',         color: '#b91c1c', image: imgMujeres },
    { id: 7,  title: 'Stranger Things',          category: 'CUADRO HD',         color: '#b91c1c', image: imgStrangerThings },
    // Tazones
    { id: 11, title: 'Tazón Naturaleza',         category: 'TAZONES',           color: '#a21caf', image: imgEstrela },
    { id: 12, title: 'Tazón Especial DDM',       category: 'TAZONES',           color: '#a21caf', image: imgTazonMujeres },
    // Mousepad
    { id: 8,  title: 'MousePad Starry Night',    category: 'MOUSEPAD',          color: '#1d4ed8', image: imgMousepad },
    // ID Mascotas
    { id: 9,  title: 'Placa ID Bailey',          category: 'ID MASCOTAS',       color: '#d97706', image: imgPlacaBailey },
    { id: 10, title: 'Retrato Mascotas',         category: 'ID MASCOTAS',       color: '#d97706', image: imgPerro },
    { id: 14, title: 'Placas Mascotas',          category: 'ID MASCOTAS',       color: '#d97706', image: imgPlacasMascotas },
    // Impresión 3D
    { id: 15, title: 'Engranaje 3D',             category: 'IMPRESIÓN 3D',      color: '#ea580c', image: imgImpresionEngranaje },
    { id: 16, title: 'Chasis Oruga',             category: 'IMPRESIÓN 3D',      color: '#ea580c', image: imgImpresionOruga },
    // Corporativo
    { id: 13, title: 'Logo Corporativo',         category: 'CORPORATIVO / OTRO',color: '#1D4ED8', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

export function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const total = CATEGORIES.length;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openLightbox = (item) => { if (item.image) setSelectedImage(item); };
    const closeLightbox = () => setSelectedImage(null);

    return (
        <section id="gallery" className="gallery-section container">
            <div className="section-header">
                <p className="section-subtitle">NUESTRO CATÁLOGO</p>
                <h2 className="section-title">
                    {activeCategory
                        ? `Catálogo: ${activeCategory}`
                        : <><span>DESCUBRE LO QUE </span><span style={{ color: 'var(--color-primary)' }}>PODEMOS CREAR</span></>}
                </h2>
            </div>

            <AnimatePresence mode="wait">
                {!activeCategory ? (
                    <motion.div key="carousel-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>VER CATEGORÍAS</span>
                                <ChileanHamburger isOpen={isCategoryMenuOpen} onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)} size={32} />
                            </div>
                            
                            <AnimatePresence>
                                {isCategoryMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden', width: '100%', maxWidth: '800px' }}
                                    >
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', padding: '10px' }}>
                                            {CATEGORIES.map((cat, idx) => (
                                                <motion.button
                                                    key={cat.title}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    onClick={() => {
                                                        setActiveCategory(cat.title);
                                                        setIsCategoryMenuOpen(false); // Close menu
                                                    }}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(14,165,233,0.3)',
                                                        padding: '12px 10px',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        textAlign: 'center',
                                                        fontSize: '0.9rem'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.background = 'var(--color-primary)';
                                                        e.currentTarget.style.color = 'black';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                                        e.currentTarget.style.color = 'white';
                                                    }}
                                                >
                                                    {cat.title}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="items-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button className="filter-btn active" onClick={() => setActiveCategory(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ArrowLeft size={18} /> Volver a los Productos
                            </button>
                        </div>
                        <div className="gallery-grid">
                            {ITEMS.filter(item => item.category === activeCategory).length > 0 ? (
                                ITEMS.filter(item => item.category === activeCategory).map(item => (
                                    <GalleryItem key={item.id} item={item} onClick={() => openLightbox(item)} />
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <h3>Pronto subiremos ejemplos de esta categoría.</h3>
                                    <p>¡Sé el primero en pedir un diseño de {activeCategory}!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
                        <button className="lightbox-close" onClick={closeLightbox}><X size={32} /></button>
                        <motion.div className="lightbox-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage.image} alt={selectedImage.title} loading="eager" className="lightbox-img"
                                style={{ objectFit: selectedImage.objectFit || 'contain', backgroundColor: selectedImage.objectFit === 'contain' ? '#1f2833' : 'transparent', padding: selectedImage.padding || '0' }} />
                            <div className="lightbox-caption">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function arrowBtnStyle(side) {
    return {
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [side]: '0', zIndex: 10,
        background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.4)',
        color: 'var(--color-primary)', borderRadius: '50%',
        width: '38px', height: '38px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
    };
}

function GalleryItem({ item, onClick }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="gallery-item glass-panel lightbox-trigger"
            onClick={onClick}
        >
            {item.image ? (
                <>
                    <img src={item.image} alt={item.title} loading="lazy" className="gallery-img"
                        style={{ width: '100%', height: '100%', objectFit: item.objectFit || 'cover', backgroundColor: '#1a1a1a', padding: item.padding || '0' }} />
                    <div className="zoom-icon-overlay"><ZoomIn size={32} /></div>
                </>
            ) : (
                <div className="gallery-img" style={{ background: `linear-gradient(45deg, #1A1A1A, ${item.color})`, width: '100%', height: '100%' }} />
            )}
            <div className="gallery-overlay">
                <h3 className="item-title">{item.title}</h3>
                <span className="item-category">{item.category}</span>
            </div>
        </motion.div>
    );
}
