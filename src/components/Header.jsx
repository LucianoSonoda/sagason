import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoChico from '../assets/logo-chico.png';

export function Header() {
    return (
        <header className="header glass-panel">
            <div className="header-content container">
                <Link to="/" className="logo">
                    <img src={logoChico} alt="SAGASON" className="header-logo-img" />
                </Link>
                <nav className="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/gallery">Catálogo</Link>
                    <Link to="/custom">Personalizar</Link>
                    <Link to="/" onClick={(e) => { e.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}}>Contacto</Link>
                </nav>
                <Link to="/custom" className="btn-header">Pedir Ahora</Link>
            </div>
        </header>
    );
}
