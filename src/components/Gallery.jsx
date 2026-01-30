import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Gallery.css';

// Placeholder data - In a real app, this would come from an API or file
const ITEMS = [
    { id: 1, title: 'Logo Metálico', category: 'Empresas', color: '#45a29e' },
    { id: 2, title: 'Cyberpunk Ed.', category: 'Juegos', color: '#facc15' },
    { id: 3, title: 'Cine Clásico', category: 'Películas', color: '#e2e8f0' },
    { id: 4, title: 'Camiseta 10', category: 'Deportes', color: '#ef4444' },
    { id: 5, title: 'Escudo Clan', category: 'Juegos', color: '#8b5cf6' },
    { id: 6, title: 'Poster Retro', category: 'Películas', color: '#f97316' },
];

const CATEGORIES = ['Todos', 'Juegos', 'Películas', 'Deportes', 'Empresas'];

export function Gallery() {
    const [filter, setFilter] = useState('Todos');

    const filteredItems = filter === 'Todos'
        ? ITEMS
        : ITEMS.filter(item => item.category === filter);

    return (
        <section id="gallery" className="gallery-section container">
            <div className="section-header">
                <h2 className="section-title">Catálogo de Inspiración</h2>
                <p>Descubre lo que podemos crear para ti.</p>
            </div>

            <div className="gallery-filters">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="gallery-grid">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <GalleryItem key={item.id} item={item} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
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
            {/* Placeholder Image using CSS Gradient */}
            <div
                className="gallery-img"
                style={{
                    background: `linear-gradient(45deg, #1f2833, ${item.color})`,
                    width: '100%',
                    height: '100%'
                }}
            />
            <div className="gallery-overlay">
                <h3 className="item-title">{item.title}</h3>
                <span className="item-category">{item.category}</span>
            </div>
        </motion.div>
    );
}
