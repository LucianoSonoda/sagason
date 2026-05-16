import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/Header.css';
import logoChico from '../assets/logo-chico.png';

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const topNavLinks = [
        { name: 'Aventuras', href: '/aventuras' },
        { name: 'Comunidad 4K', href: '/tags-4k' },
        { name: 'Catálogo', href: '/catalogo' },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-content container glass-panel">
                <Link to="/#home" className="logo">
                    <img src={logoChico} alt="SAGASON" className="header-logo-img" />
                </Link>

                <nav className="nav">
                    {topNavLinks.map(link => (
                        link.external ? 
                        <a key={link.name} href={link.href}>{link.name}</a> :
                        <Link key={link.name} to={link.href}>{link.name}</Link>
                    ))}
                </nav>

                <div className="header-right">
                    <div className="header-actions">
                        <Link to="/#custom" className="btn-header">
                            Pedir Ahora <ArrowRight size={16} />
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}
