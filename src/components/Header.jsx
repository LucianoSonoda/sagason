import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, ShoppingCart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';
import logoChico from '../assets/logo-chico.png';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, login, logout } = useAuth();
    const { cart, setIsDrawerOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Aventuras', href: '/aventuras' },
        { name: 'Comunidad 4K', href: '/tags-4k' },
        { name: 'Catálogo', href: '/#gallery' },
        { name: 'Personalizar', href: '/#custom' },
        { name: 'Contacto', href: '/#contact' },
    ];
    
    if (user) {
        navLinks.splice(2, 0, { name: 'Mis Pedidos', href: '/mis-pedidos' });
    }

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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

                <div className="header-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={user.picture} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} title="Cerrar sesión">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={credentialResponse => login(credentialResponse.credential)}
                            onError={() => console.log('Login Failed')}
                            type="icon"
                            shape="circle"
                            theme="filled_black"
                        />
                    )}
                    
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', position: 'relative' }}
                    >
                        <ShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: 'var(--color-primary, #0EA5E9)',
                                color: '#fff',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}>
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    <Link to="/#custom" className="btn-header" style={{ marginLeft: '10px' }}>
                        Pedir Ahora <ArrowRight size={16} />
                    </Link>
                </div>

                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
                    {isOpen ? (
                        <X size={24} color="#fff" />
                    ) : (
                        <span className="hamburger-tricolor">
                            <span className="bar bar-red"></span>
                            <span className="bar bar-white"></span>
                            <span className="bar bar-blue"></span>
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

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
