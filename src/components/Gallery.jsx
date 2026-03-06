import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import '../styles/Gallery.css';

import logoCompleto from '../assets/logo-completo.jpg';
import imgCastillo from '../assets/Castilloconbrillo.jpeg';
import imgAluminio1 from '../assets/Cuador Aluminio1.jpeg';
import imgAluminio5 from '../assets/Cuador Aluminio5.jpeg';
import imgAluminio6 from '../assets/Cuador Aluminio6.jpeg';
import imgCuadroMujeres from '../assets/Cuadro dia de las mujeres.png';
import imgMousepad from '../assets/MousePad_StarryNight.png';
import imgPlacaBailey from '../assets/Placa identificación Bailey_upscayl_3x_upscayl-standard-4x.png';
import imgUstedDonde from '../assets/Usted donde quiera.png';
import imgEstrela from '../assets/estrela.png';
import imgMujeres from '../assets/mujeres.jpeg';
import imgPerro from '../assets/perro.jpg';
import imgTazonMujeres from '../assets/tazon DIa de las mujeres.png';

// Categorías idénticas al formulario multipaso
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
    { title: 'CORPORATIVO / OTRO', color: '#E7AC23', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

// Items y portafolio de fotos
const ITEMS = [
    { id: 1, title: 'Cuadro Aluminio HD', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio1 },
    { id: 2, title: 'Edición Especial Aluminio', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio5 },
    { id: 3, title: 'Placa con Brillo', category: 'CUADRO HD', color: '#b91c1c', image: imgAluminio6 },
    { id: 4, title: 'Castillo y Magia', category: 'CUADRO HD', color: '#b91c1c', image: imgCastillo },
    { id: 5, title: 'Cuadro Día de la Mujer', category: 'CUADRO HD', color: '#b91c1c', image: imgCuadroMujeres },
    { id: 6, title: 'Diseño Mujeres', category: 'CUADRO HD', color: '#b91c1c', image: imgMujeres },
    { id: 7, title: 'Usted Donde Quiera', category: 'CUADRO HD', color: '#b91c1c', image: imgUstedDonde },

    { id: 8, title: 'MousePad Starry Night', category: 'MOUSEPAD', color: '#1d4ed8', image: imgMousepad },

    { id: 9, title: 'Placa Identificación Bailey', category: 'ID MASCOTAS', color: '#b45309', image: imgPlacaBailey },
    { id: 10, title: 'Retrato Mascotas', category: 'ID MASCOTAS', color: '#b45309', image: imgPerro },

    { id: 11, title: 'Tazón Naturaleza', category: 'TAZONES', color: '#a21caf', image: imgEstrela },

    { id: 12, title: 'Tazón Especial DDM', category: 'TAZONES', color: '#a21caf', image: imgTazonMujeres },

    { id: 13, title: 'Logo Corporativo', category: 'CORPORATIVO / OTRO', color: '#E7AC23', image: logoCompleto, objectFit: 'contain', padding: '1rem' }
];

export function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Estado para el modal de imagen gigante

    const openLightbox = (item) => {
        // Solo abrir si tiene imagen real, los de color gradiente no es necesario expandirlos
        if (item.image) {
            setSelectedImage(item);
        }
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <section id="gallery" className="gallery-section container">
            <div className="section-header">
                <p className="section-subtitle">NUESTRO CATÁLOGO</p>
                <h2 className="section-title">
                    {activeCategory ? `Catálogo: ${activeCategory}` : <>DESCUBRE LO QUE <span style={{ color: 'var(--color-primary)' }}>PODEMOS CREAR</span></>}
                </h2>
            </div>

            <AnimatePresence mode="wait">
                {!activeCategory ? (
                    <motion.div
                        key="categories-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="gallery-grid"
                    >
                        {CATEGORIES.map(cat => (
                            <CategoryCard key={cat.title} category={cat} onClick={() => setActiveCategory(cat.title)} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="items-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button
                                className="filter-btn active"
                                onClick={() => setActiveCategory(null)}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <ArrowLeft size={18} /> Volver a los Productos
                            </button>
                        </div>

                        <div className="gallery-grid">
                            {/* Buscar si hay items para esta categoria */}
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

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <X size={32} />
                        </button>
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()} /* Evita cerrar si clickeas la imagen per sé */
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="lightbox-img"
                                style={{
                                    objectFit: selectedImage.objectFit || 'contain',
                                    backgroundColor: selectedImage.objectFit === 'contain' ? '#1f2833' : 'transparent',
                                    padding: selectedImage.padding || '0'
                                }}
                            />
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

function CategoryCard({ category, onClick }) {
    return (
        <motion.div
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gallery-item glass-panel"
            onClick={onClick}
        >
            {category.image ? (
                <img
                    src={category.image}
                    alt={category.title}
                    className="gallery-img"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: category.objectFit || 'cover',
                        backgroundColor: '#1A1A1A',
                        padding: category.padding || '0',
                        opacity: 0.7
                    }}
                />
            ) : (
                <div
                    className="gallery-img"
                    style={{
                        background: `linear-gradient(135deg, #1A1A1A, ${category.color})`,
                        width: '100%',
                        height: '100%',
                        opacity: 0.7
                    }}
                />
            )}
            <div className="gallery-overlay" style={{ opacity: 1, background: 'rgba(13, 13, 13, 0.5)' }}>
                <h3 className="item-title category-label" style={{ transform: 'none', fontSize: '1.5rem', textAlign: 'center' }}>
                    {category.title}
                </h3>
                <span className="item-category" style={{ transform: 'none', marginTop: '0.5rem', opacity: 0.9, background: 'var(--color-primary)', color: '#0D0D0D', padding: '0.2rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
                    Explorar
                </span>
            </div>
        </motion.div>
    );
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
                    <img
                        src={item.image}
                        alt={item.title}
                        className="gallery-img"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: item.objectFit || 'cover',
                            backgroundColor: '#1a1a1a',
                            padding: item.padding || '0'
                        }}
                    />
                    <div className="zoom-icon-overlay">
                        <ZoomIn size={32} />
                    </div>
                </>
            ) : (
                <div
                    className="gallery-img"
                    style={{
                        background: `linear-gradient(45deg, #1A1A1A, ${item.color})`,
                        width: '100%',
                        height: '100%'
                    }}
                />
            )}
            <div className="gallery-overlay">
                <h3 className="item-title">{item.title}</h3>
                <span className="item-category">{item.category}</span>
            </div>
        </motion.div>
    );
}
