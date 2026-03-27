import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Gallery.css';

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
    { title: 'POSAVASOS', color: '#c2410c' },
    { title: 'MOUSEPAD', color: '#1d4ed8', image: imgMousepad },
    { title: 'CUADRO HD', color: '#b91c1c', image: imgAluminio1 },
    { title: 'LLAVEROS', color: '#047857' },
    { title: 'ID MASCOTAS', color: '#b45309', image: imgPlacaBailey },
    { title: 'ID SALUD', color: '#be185d' },
    { title: 'ROMPECABEZAS', color: '#4338ca' },
    { title: 'TAZONES', color: '#a21caf', image: imgTazonMujeres },
    { title: 'TUMBLERS', color: '#0f766e' },
    { title: 'IMPRESIÓN 3D', color: '#ea580c', image: imgImpresionOruga },
    { title: 'CORPORATIVO / OTRO', color: '#1D4ED8', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

const ITEMS = [
    { id: 1, title: 'Cuadro Aluminio HD', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio1 },
    { id: 2, title: 'Edición Especial Aluminio', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio5 },
    { id: 3, title: 'Placa con Brillo', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio6 },
    { id: 4, title: 'Castillo y Magia', category: 'CUADRO HD', color: '#b91c1c', image: imgCastillo },
    { id: 5, title: 'Cuadro Día de la Mujer', category: 'CUADRO HD', color: '#b91c1c', image: imgCuadroMujeres },
    { id: 6, title: 'Diseño Mujeres', category: 'CUADRO HD', color: '#b91c1c', image: imgMujeres },
    { id: 7, title: 'Stranger Things', category: 'CUADRO HD', color: '#b91c1c', image: imgStrangerThings },
    { id: 8, title: 'MousePad Starry Night', category: 'MOUSEPAD', color: '#1d4ed8', image: imgMousepad },
    { id: 9, title: 'Placa Identificación Bailey', category: 'ID MASCOTAS', color: '#b45309', image: imgPlacaBailey },
    { id: 10, title: 'Retrato Mascotas', category: 'ID MASCOTAS', color: '#b45309', image: imgPerro },
    { id: 14, title: 'Placas Mascotas', category: 'ID MASCOTAS', color: '#b45309', image: imgPlacasMascotas },
    { id: 11, title: 'Tazón Naturaleza', category: 'TAZONES', color: '#a21caf', image: imgEstrela },
    { id: 12, title: 'Tazón Especial DDM', category: 'TAZONES', color: '#a21caf', image: imgTazonMujeres },
    { id: 15, title: 'Mecanismo Engranaje 3D', category: 'IMPRESIÓN 3D', color: '#ea580c', image: imgImpresionEngranaje },
    { id: 16, title: 'Chasis Oruga', category: 'IMPRESIÓN 3D', color: '#ea580c', image: imgImpresionOruga },
    { id: 13, title: 'Logo Corporativo', category: 'CORPORATIVO / OTRO', color: '#1D4ED8', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

export function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const total = CATEGORIES.length;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Tarjetas visibles según ancho de pantalla
    const visibleCount = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;

    const paginate = (dir) => {
        setCurrent(([c]) => [(c + dir + total) % total, dir]);
    };

    useEffect(() => {
        if (paused || activeCategory) return;
        intervalRef.current = setInterval(() => {
            setCurrent(([c]) => [(c + 1) % total, 1]);
        }, 3000);
        return () => clearInterval(intervalRef.current);
    }, [paused, current, activeCategory]);

    const getVisible = () => {
        if (visibleCount === 1) return [{ ...CATEGORIES[current], idx: current, offset: 0 }];
        if (visibleCount === 2) return [-1, 0].map(offset => {
            const idx = (current + offset + total) % total;
            return { ...CATEGORIES[idx], idx, offset };
        });
        return [-1, 0, 1].map(offset => {
            const idx = (current + offset + total) % total;
            return { ...CATEGORIES[idx], idx, offset };
        });
    };

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
                        {/* Carrusel de 3 categorías visibles */}
                        <div
                            style={{ position: 'relative', maxWidth: visibleCount === 1 ? '340px' : visibleCount === 2 ? '620px' : '860px', margin: '0 auto 28px auto', padding: '0 44px' }}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <button onClick={() => paginate(-1)} style={arrowBtnStyle('left')}><ChevronLeft size={24} /></button>
                            <button onClick={() => paginate(1)} style={arrowBtnStyle('right')}><ChevronRight size={24} /></button>

                            <div style={{ display: 'flex', gap: '16px', overflow: 'hidden', justifyContent: 'center' }}>
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    {getVisible().map(({ title, color, image, objectFit, padding, idx, offset }) => (
                                        <motion.div
                                            key={idx}
                                            custom={direction}
                                            initial={{ opacity: 0, x: direction > 0 ? 120 : -120, scale: 0.85 }}
                                            animate={{ opacity: offset === 0 ? 1 : 0.5, x: 0, scale: offset === 0 ? 1 : 0.88 }}
                                            exit={{ opacity: 0, x: direction > 0 ? -120 : 120, scale: 0.85 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            onClick={() => offset === 0 ? setActiveCategory(title) : paginate(offset)}
                                            style={{
                                                flex: `0 0 calc(${100 / visibleCount}% - ${visibleCount > 1 ? '11px' : '0px'})`,
                                                aspectRatio: '3/2',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                border: offset === 0 ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)',
                                                boxShadow: offset === 0 ? '0 0 24px rgba(14,165,233,0.35)' : 'none',
                                            }}
                                        >
                                            {image ? (
                                                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: objectFit || 'cover', padding: padding || '0', opacity: 0.75 }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, #1A1A1A, ${color})`, opacity: 0.75 }} />
                                            )}
                                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                <h3 style={{
                                                    color: '#fff', fontWeight: 800,
                                                    fontSize: offset === 0 ? (windowWidth < 640 ? '1rem' : '1.2rem') : '0.85rem',
                                                    letterSpacing: '1px', margin: 0, textAlign: 'center',
                                                    wordBreak: 'break-word', padding: '0 8px',
                                                }}>{title}</h3>
                                                {offset === 0 && (
                                                    <span style={{ background: 'var(--color-primary)', color: '#000', padding: '2px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>EXPLORAR</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Dots */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            {CATEGORIES.map((_, i) => (
                                <button key={i} onClick={() => setCurrent([i, i > current ? 1 : -1])} style={{
                                    width: i === current ? '24px' : '8px', height: '8px',
                                    borderRadius: '9999px', border: 'none', cursor: 'pointer',
                                    background: i === current ? 'var(--color-primary)' : 'rgba(14,165,233,0.3)',
                                    transition: 'all 0.3s ease', padding: 0,
                                }} />
                            ))}
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
                            <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-img"
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
                    <img src={item.image} alt={item.title} className="gallery-img"
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
