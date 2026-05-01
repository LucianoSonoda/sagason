import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Header.css';
import logoChico from '../assets/logo-chico.png';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Inicio', href: '/#home' },
        { name: 'Aventuras', href: '/aventuras' },
        { name: 'Catálogo', href: '/#gallery' },
        { name: 'Personalizar', href: '/#custom' },
        { name: 'Panel de Control', href: '/dashboard.html', external: true },
        { name: 'Contacto', href: '/#contact' },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-content container glass-panel">
                <Link to="/#home" className="logo">
                    <img src={logoChico} alt="SAGASON" className="header-logo-img" />
                </Link>

                <nav className="nav desktop-only">
                    {navLinks.map(link => (
                        link.external ? 
                        <a key={link.name} href={link.href}>{link.name}</a> :
                        <Link key={link.name} to={link.href}>{link.name}</Link>
                    ))}
                </nav>

                <div className="header-actions desktop-only">
                    <Link to="/#custom" className="btn-header">
                        Pedir Ahora <ArrowRight size={16} />
                    </Link>
                </div>

                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {link.external ? 
                                        <a href={link.href} className="mobile-link" onClick={() => setIsOpen(false)}>
                                            {link.name}
                                        </a> :
                                        <Link to={link.href} className="mobile-link" onClick={() => setIsOpen(false)}>
                                            {link.name}
                                        </Link>
                                    }
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                style={{ marginTop: '2rem' }}
                            >
                                <Link to="/#custom" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={() => setIsOpen(false)}>
                                    Pedir Ahora
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
