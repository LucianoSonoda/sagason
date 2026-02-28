import React from 'react';
import '../styles/Header.css';

export function Header() {
    return (
        <header className="header glass-panel">
            <div className="header-content container">
                <a href="#home" className="logo">
                    <img src="/logo-chico.png" alt="SAGASON" className="header-logo-img" />
                </a>
                <nav className="nav">
                    <a href="#home">Inicio</a>
                    <a href="#gallery">Catálogo</a>
                    <a href="#custom">Personalizar</a>
                    <a href="#contact">Contacto</a>
                </nav>
            </div>
        </header>
    );
}
