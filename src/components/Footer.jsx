import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Star } from 'lucide-react';
import QRCode from 'qrcode';
import '../styles/Footer.css';
import logoCompleto from '../assets/logo-completo.jpg';

export function Footer() {
    const qrRef = useRef(null);

    useEffect(() => {
        if (qrRef.current) {
            QRCode.toCanvas(qrRef.current, "https://g.page/r/Ca4jYRRtGQBTEBI/review", {
                width: 120,
                margin: 2,
                color: { dark: '#000000', light: '#ffffff' },
                errorCorrectionLevel: 'M'
            }).catch(console.error);
        }
    }, []);
    return (
        <footer id="contact" className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src={logoCompleto} alt="Sagason SpA" className="footer-logo-img" />
                    <p>Placas personalizadas de metal con calidad que dura toda la vida.</p>
                </div>

                <div className="footer-links-col">
                    <h3 className="footer-title">Enlaces Rápidos</h3>
                    <Link to="/" className="footer-link">Inicio</Link>
                    <Link to="/gallery" className="footer-link">Catálogo</Link>
                    <Link to="/custom" className="footer-link">Personalizar</Link>
                    <Link to="/warranty" className="footer-link">Garantía y Políticas</Link>
                    <Link to="/privacidad" className="footer-link">Privacidad y Datos</Link>
                </div>

                <div className="footer-links-col contact-col">
                    <h3 className="footer-title">Contacto</h3>
                    <a href="mailto:ventas@sagason.cl" className="social-link"><Mail size={18} /> ventas@sagason.cl</a>
                    <a href="https://www.instagram.com/sagasoncl/" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={18} /> @sagason.cl</a>
                    <span className="social-link" style={{ cursor: 'default' }}><MapPin size={18} /> Envíos a todo Chile</span>
                </div>

                <div className="footer-links-col review-col">
                    <h3 className="footer-title">Calificaciones</h3>
                    <a href="https://g.page/r/Ca4jYRRtGQBTEBI/review" target="_blank" rel="noopener noreferrer" className="social-link" style={{ marginBottom: '8px' }}>
                        ¡Califícanos en Google! <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    </a>
                    <div className="qr-wrapper" style={{ background: 'white', padding: '5px', borderRadius: '8px', display: 'inline-flex' }}>
                        <canvas ref={qrRef} style={{ display: 'block' }}></canvas>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Sagason. Hecho con 4K desde Chile para el Mundo.
            </div>
        </footer>
    );
}
