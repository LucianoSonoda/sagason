import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/Header.css';
import logoChico from '../assets/logo-chico.png';

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header glass-panel">
            <div className="header-content container">
                <Link to="/#home" className="logo" onClick={closeMenu}>
                    <img src={logoChico} alt="SAGASON" className="header-logo-img" />
                </Link>

                <div className="mobile-menu-toggle" onClick={toggleMenu}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                    <Link to="/#home" onClick={closeMenu}>Inicio</Link>
                    <Link to="/#gallery" onClick={closeMenu}>Catálogo</Link>
                    <Link to="/#custom" onClick={closeMenu}>Personalizar</Link>
                    <Link to="/#contact" onClick={closeMenu}>Contacto</Link>
                    <Link to="/#custom" className="btn-header mobile-btn" onClick={closeMenu}>Pedir Ahora</Link>
                </nav>
                <Link to="/#custom" className="btn-header desktop-btn">Pedir Ahora</Link>
            </div>
        </header>
    );
}
