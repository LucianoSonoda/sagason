import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const GDPRConsent = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sagason_gdpr_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sagason_gdpr_consent', 'true');
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    // En un sistema estricto, podrías no permitirles usar funcionalidades avanzadas
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: 'var(--color-bg, #1a1a1a)',
      color: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      maxWidth: '600px',
      margin: '0 auto',
      border: '1px solid #333'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <ShieldCheck size={32} color="var(--color-primary, #0EA5E9)" />
        <h3 style={{ margin: 0 }}>Privacidad y Cookies (GDPR)</h3>
      </div>
      <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc' }}>
        Utilizamos cookies y tecnologías similares para recordar tus preferencias y mantener tu carrito de compras persistente. 
        Al iniciar sesión con Google, aceptas nuestra política de privacidad y el almacenamiento seguro de tu información básica.
        Puedes solicitar la eliminación completa de tus datos en cualquier momento.
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleDecline}
          style={{
            background: 'transparent',
            color: '#aaa',
            border: '1px solid #555',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Rechazar Cookies
        </button>
        <button 
          onClick={handleAccept}
          style={{
            background: 'var(--color-primary, #0EA5E9)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Aceptar y Continuar
        </button>
      </div>
    </div>
  );
};
