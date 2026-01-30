import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import '../styles/Footer.css';

export function Footer() {
    return (
        <footer id="contact" className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>Sagason SpA</h3>
                    <p>Placas de metal personalizadas con ingeniería de precisión.</p>
                </div>
                <div className="footer-links">
                    <a href="#" className="social-link"><Instagram size={20} /> @sagason.cl</a>
                    <a href="mailto:contacto@sagason.cl" className="social-link"><Mail size={20} /> contacto@sagason.cl</a>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Sagason SpA. Todos los derechos reservados.
            </div>
        </footer>
    );
}
