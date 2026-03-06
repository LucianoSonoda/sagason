import React from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import '../styles/Footer.css';
import logoCompleto from '../assets/logo-completo.jpg';

export function Footer() {
    return (
        <footer id="contact" className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src={logoCompleto} alt="Sagason SpA" className="footer-logo-img" />
                    <p>Placas personalizadas de metal con calidad que dura toda la vida.</p>
                </div>

                <div className="footer-links-col">
                    <h3 className="footer-title">Enlaces Rápidos</h3>
                    <a href="#home" className="footer-link">Inicio</a>
                    <a href="#gallery" className="footer-link">Catálogo</a>
                    <a href="#custom" className="footer-link">Personalizar</a>
                    <a href="#warranty" className="footer-link">Garantía y Políticas</a>
                </div>

                <div className="footer-links-col contact-col">
                    <h3 className="footer-title">Contacto</h3>
                    <a href="mailto:ventas@sagason.cl" className="social-link"><Mail size={18} /> ventas@sagason.cl</a>
                    <a href="https://www.instagram.com/sagasoncl/" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={18} /> @sagason.cl</a>
                    <span className="social-link" style={{ cursor: 'default' }}><MapPin size={18} /> Envíos a todo Chile</span>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Sagason. Hecho con ❤️ en Chile 🇨🇱.
            </div>
        </footer>
    );
}
