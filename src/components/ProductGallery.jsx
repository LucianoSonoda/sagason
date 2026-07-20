import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
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

function GalleryItem({ item, onClick }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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

export function ProductGallery({ category }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredItems = ITEMS.filter(item => item.category === category);
    
    // Si no hay items para esta categoría, no mostramos nada.
    if (filteredItems.length === 0) return null;

    const openLightbox = (item) => { if (item.image) setSelectedImage(item); };
    const closeLightbox = () => setSelectedImage(null);

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                Fotos Reales de {category}
            </h3>
            
            <div className="gallery-grid" style={{ marginTop: '1rem' }}>
                {filteredItems.map(item => (
                    <GalleryItem key={item.id} item={item} onClick={() => openLightbox(item)} />
                ))}
            </div>

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
        </div>
    );
}
