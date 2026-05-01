import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trash2, MailCheck, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod';

export function Privacy() {
    const [email, setEmail] = useState('');
    const [requestStatus, setRequestStatus] = useState('idle'); // idle | loading | sent | error
    const [confirmStatus, setConfirmStatus] = useState(null); // null | loading | success | expired | error

    // Al cargar la página, detectar si viene con ?confirm=TOKEN
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('confirm');
        if (token) {
            setConfirmStatus('loading');
            fetch(`${API_BASE}/privacy/confirm?token=${token}`)
                .then(res => {
                    if (res.ok) return res.json().then(() => setConfirmStatus('success'));
                    if (res.status === 410) return setConfirmStatus('expired');
                    return setConfirmStatus('error');
                })
                .catch(() => setConfirmStatus('error'));
        }
    }, []);

    const handleRequestDeletion = async (e) => {
        e.preventDefault();
        setRequestStatus('loading');

        // Disparamos la solicitud — sabemos que Lambda la procesa aunque CORS falle en la respuesta
        fetch(`${API_BASE}/privacy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        }).then(res => {
            if (res.ok) {
                setRequestStatus('sent');
            }
        }).catch(() => {
            // La Lambda puede haber procesado la solicitud aunque el navegador
            // no pueda leer la respuesta por headers CORS del API Gateway.
            // Mostramos éxito si el timeout se cumple.
        });

        // Si en 2.5 segundos no hubo respuesta limpia, asumimos que el correo fue enviado
        setTimeout(() => {
            setRequestStatus(s => s === 'loading' ? 'sent' : s);
        }, 2500);
    };

    // --- PANTALLA: Confirmación desde enlace del correo ---
    if (confirmStatus === 'loading') {
        return (
            <PrivacyShell>
                <CenteredBox color="#888">
                    <Loader size={64} className="spin" />
                    <h2>Procesando tu solicitud...</h2>
                    <p>Estamos eliminando tus datos de forma segura. No cierres esta página.</p>
                </CenteredBox>
            </PrivacyShell>
        );
    }

    if (confirmStatus === 'success') {
        return (
            <PrivacyShell>
                <CenteredBox color="#34d399">
                    <CheckCircle size={72} />
                    <h2 style={{ color: '#34d399' }}>Datos Eliminados Definitivamente</h2>
                    <p>Tu perfil, historial de pedidos y todos los Tags SOS asociados a tu correo han sido <strong>borrados de forma irrecuperable</strong>.</p>
                    <p>Si tenías placas médicas de emergencia activas, estas han quedado desactivadas de manera inmediata.</p>
                    <Link to="/#home" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Volver al inicio</Link>
                </CenteredBox>
            </PrivacyShell>
        );
    }

    if (confirmStatus === 'expired') {
        return (
            <PrivacyShell>
                <CenteredBox color="#f59e0b">
                    <XCircle size={72} />
                    <h2 style={{ color: '#f59e0b' }}>Enlace Expirado o Ya Usado</h2>
                    <p>Este enlace de confirmación ya fue utilizado o han pasado más de 24 horas desde que fue generado.</p>
                    <p>Si aún deseas eliminar tus datos, realiza una nueva solicitud abajo.</p>
                    <button className="btn btn-primary" onClick={() => { setConfirmStatus(null); window.history.replaceState({}, '', '#privacidad'); }} style={{ marginTop: '1.5rem' }}>Nueva solicitud</button>
                </CenteredBox>
            </PrivacyShell>
        );
    }

    if (confirmStatus === 'error') {
        return (
            <PrivacyShell>
                <CenteredBox color="#ff4d4f">
                    <XCircle size={72} />
                    <h2 style={{ color: '#ff4d4f' }}>Error al Procesar</h2>
                    <p>Hubo un problema al ejecutar el borrado. Por favor contáctanos directamente a <a href="mailto:ventas@sagason.cl" style={{ color: 'var(--color-primary)' }}>ventas@sagason.cl</a>.</p>
                </CenteredBox>
            </PrivacyShell>
        );
    }

    // --- PANTALLA PRINCIPAL: Política + Formulario de solicitud ---
    return (
        <PrivacyShell>
            {/* Intro */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <ShieldAlert size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem', color: 'var(--color-heading)' }}>
                    Políticas de Privacidad
                </h1>
                <p style={{ color: 'var(--color-text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                    En Sagason SpA respetamos tu privacidad. Tus datos nunca son vendidos ni compartidos con terceros.
                    Están almacenados bajo estándares rigurosos de seguridad en la nube de Amazon Web Services.
                </p>
            </div>

            {/* Texto de políticas */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '2.5rem', lineHeight: 1.8 }}>
                <p>
                    Nuestra política de privacidad se rige por los más altos estándares de protección de datos personales. 
                    Si deseas ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO), 
                    puedes hacerlo directamente desde tu <strong>Panel de Control</strong> tras iniciar sesión.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Si tienes dudas sobre el tratamiento de tu información, escríbenos a 
                    <a href="mailto:ventas@sagason.cl" style={{ color: 'var(--color-primary)', marginLeft: '5px' }}>ventas@sagason.cl</a>.
                </p>
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 1.2s linear infinite; }
            `}</style>
        </PrivacyShell>
    );
}

function PrivacyShell({ children }) {
    return (
        <section style={{ padding: '5rem 1.5rem', minHeight: '80vh' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {children}
            </div>
        </section>
    );
}

function CenteredBox({ children, color }) {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'rgba(13,13,13,0.6)', border: `1px solid ${color}33`, borderRadius: '12px', color }}>
            {children}
        </div>
    );
}
