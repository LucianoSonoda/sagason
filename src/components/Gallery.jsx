import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import '../styles/Gallery.css';

import logoCompleto from '../assets/logo-completo.jpg';
import imgCelestialWings from '../assets/celestial-wings.jpg';
import imgStrangerThings from '../assets/stranger-things.png';

// Las categorías principales (las portadas)
const CATEGORIES = [
    { id: 'empresas', title: 'Empresas', color: '#45a29e', image: logoCompleto, objectFit: 'contain', padding: '1rem' },
    { id: 'peliculas-anime', title: 'Películas & Anime', color: '#3b82f6', image: imgCelestialWings },
    { id: 'juegos', title: 'Juegos', color: '#facc15' },
    { id: 'deportes', title: 'Deportes', color: '#10b981' },
];

// Los ítems o fotos dentro de cada categoría
const ITEMS = [
    { id: 1, title: 'Logo Corporativo', category: 'Empresas', color: '#45a29e', image: logoCompleto, objectFit: 'contain', padding: '1rem' },
    { id: 2, title: 'Letrero Metálico', category: 'Empresas', color: '#2c3e50' },
    { id: 3, title: 'Celestial Wings', category: 'Películas & Anime', color: '#3b82f6', image: imgCelestialWings },
    { id: 4, title: 'Stranger Things', category: 'Películas & Anime', color: '#ef4444', image: imgStrangerThings },
    { id: 5, title: 'Póster Clásico', category: 'Películas & Anime', color: '#e2e8f0' },
    { id: 6, title: 'Cyberpunk Ed.', category: 'Juegos', color: '#facc15' },
    { id: 7, title: 'Escudo Clan', category: 'Juegos', color: '#8b5cf6' },
    { id: 8, title: 'Camiseta 10', category: 'Deportes', color: '#10b981' },
    { id: 9, title: 'Estadio Nacional', category: 'Deportes', color: '#f97316' },
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
