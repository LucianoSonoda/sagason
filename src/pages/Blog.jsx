import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight } from 'lucide-react';
import LeyCholitoVsQR from './blog/LeyCholitoVsQR';
import ProteccionAdultosMayores from './blog/ProteccionAdultosMayores';
import SublimacionVsPapel from './blog/SublimacionVsPapel';
import '../styles/Home.css';

const BLOG_POSTS = [
    {
        id: 'ley-cholito-vs-qr',
        title: 'Microchip obligatorio vs. Placas QR en Chile (Ley Cholito)',
        excerpt: 'Descubre por qué el microchip no es suficiente para que tu mascota regrese rápido a casa.',
        date: '2026-07-10',
        category: 'Seguridad Mascotas'
    },
    {
        id: 'proteccion-adultos-mayores',
        title: 'Proteger el historial médico en adultos mayores sin vulnerar privacidad',
        excerpt: 'Cómo la tecnología NFC/QR ayuda en emergencias y crisis de memoria.',
        date: '2026-07-05',
        category: 'ID Salud'
    },
    {
        id: 'sublimacion-vs-papel',
        title: 'Sublimación en aluminio vs. Impresión fotográfica',
        excerpt: '¿Cuál resiste mejor la humedad y la radiación UV en Santiago? Análisis técnico.',
        date: '2026-07-01',
        category: 'Arte y Durabilidad'
    }
];

function BlogIndex() {
    useSEO({
        title: 'Blog Técnico y Guías de Seguridad | Sagason SpA',
        description: 'Aprende sobre tecnología de sublimación, normativas de mascotas (Ley Cholito) y seguridad médica con nuestras guías expertas.',
        keywords: 'blog sagason, ley cholito, sublimacion, identificacion qr',
        canonicalPath: '/blog'
    });

    return (
        <div className="home-wrapper" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>BLOG Y RECURSOS</span>
                    <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Conocimiento Que <span className="text-gradient">Empodera</span></h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {BLOG_POSTS.map(post => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel" 
                            style={{ padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column' }}
                        >
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>{post.category}</span>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', lineHeight: '1.4' }}>{post.title}</h3>
                            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{post.excerpt}</p>
                            <Link to={`/blog/${post.id}`} className="btn btn-glass" style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
                                Leer Artículo <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default function Blog() {
    return (
        <Routes>
            <Route index element={<BlogIndex />} />
            <Route path="ley-cholito-vs-qr" element={<LeyCholitoVsQR />} />
            <Route path="proteccion-adultos-mayores" element={<ProteccionAdultosMayores />} />
            <Route path="sublimacion-vs-papel" element={<SublimacionVsPapel />} />
        </Routes>
    );
}
