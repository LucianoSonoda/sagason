import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

// Las categorías principales (las portadas)
const CATEGORIES = [
    { id: 'posters', title: 'Posters', color: '#ef4444', image: imgCastillo },
    { id: 'mousepad', title: 'Mousepad', color: '#3b82f6', image: imgMousepad },
    { id: 'otros', title: 'Otros', color: '#facc15', image: imgTazonMujeres },
];

// Los ítems o fotos dentro de cada categoría
const ITEMS = [
    // Posters
    { id: 1, title: 'Castillo con Brillo', category: 'Posters', color: '#ef4444', image: imgCastillo },
    { id: 2, title: 'Cuadro Aluminio 1', category: 'Posters', color: '#ef4444', image: imgAluminio1 },
    { id: 3, title: 'Cuadro Aluminio 5', category: 'Posters', color: '#ef4444', image: imgAluminio5 },
    { id: 4, title: 'Cuadro Aluminio 6', category: 'Posters', color: '#ef4444', image: imgAluminio6 },
    { id: 5, title: 'Cuadro Día de la Mujer', category: 'Posters', color: '#ef4444', image: imgCuadroMujeres },
    { id: 6, title: 'Mujeres', category: 'Posters', color: '#ef4444', image: imgMujeres },
    { id: 7, title: 'Usted Donde Quiera', category: 'Posters', color: '#ef4444', image: imgUstedDonde },

    // Mousepad
    { id: 8, title: 'MousePad Starry Night', category: 'Mousepad', color: '#3b82f6', image: imgMousepad },

    // Otros
    { id: 9, title: 'Placa Bailey', category: 'Otros', color: '#facc15', image: imgPlacaBailey },
    { id: 10, title: 'Retrato Perro', category: 'Otros', color: '#facc15', image: imgPerro },
    { id: 11, title: 'Estrella', category: 'Otros', color: '#facc15', image: imgEstrela },
    { id: 12, title: 'Tazón Día de la Mujer', category: 'Otros', color: '#facc15', image: imgTazonMujeres },
    { id: 13, title: 'Logo Corporativo', category: 'Otros', color: '#facc15', image: logoCompleto, objectFit: 'contain', padding: '1rem' },
];

export function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <section id="gallery" className="gallery-section container">
            <div className="section-header">
                <h2 className="section-title">
                    {activeCategory ? `Catálogo: ${activeCategory}` : 'Catálogo de Inspiración'}
                </h2>
                <p>Descubre lo que podemos crear para ti.</p>
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
                            <CategoryCard key={cat.id} category={cat} onClick={() => setActiveCategory(cat.title)} />
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
                                <ArrowLeft size={18} /> Volver a Categorías
                            </button>
                        </div>
                        <div className="gallery-grid">
                            {ITEMS.filter(item => item.category === activeCategory).map(item => (
                                <GalleryItem key={item.id} item={item} />
                            ))}
                        </div>
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
                        backgroundColor: '#1f2833',
                        padding: category.padding || '0',
                        opacity: 0.7
                    }}
                />
            ) : (
                <div
                    className="gallery-img"
                    style={{
                        background: `linear-gradient(45deg, #1f2833, ${category.color})`,
                        width: '100%',
                        height: '100%',
                        opacity: 0.7
                    }}
                />
            )}
            <div className="gallery-overlay" style={{ opacity: 1, background: 'rgba(11, 12, 16, 0.4)' }}>
                <h3 className="item-title" style={{ transform: 'none', fontSize: '1.5rem', textAlign: 'center' }}>
                    {category.title}
                </h3>
                <span className="item-category" style={{ transform: 'none', marginTop: '0.5rem', opacity: 0.8 }}>
                    Ver Diseños
                </span>
            </div>
        </motion.div>
    );
}

function GalleryItem({ item }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="gallery-item glass-panel"
        >
            {/* Image or Placeholder using CSS Gradient */}
            {item.image ? (
                <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-img"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: item.objectFit || 'cover',
                        backgroundColor: '#1f2833',
                        padding: item.padding || '0'
                    }}
                />
            ) : (
                <div
                    className="gallery-img"
                    style={{
                        background: `linear-gradient(45deg, #1f2833, ${item.color})`,
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
