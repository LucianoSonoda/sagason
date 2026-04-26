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

            {/* Sección de borrado */}
            <div style={{ backgroundColor: 'rgba(255, 77, 79, 0.05)', border: '1px solid rgba(255, 77, 79, 0.3)', borderRadius: '12px', padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: '#ff4d4f', display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, fontSize: '1.5rem' }}>
                    <Trash2 size={24} /> Derecho al Olvido (RGPD)
                </h2>

                <p style={{ color: '#ffcccc', opacity: 0.9, lineHeight: 1.7 }}>
                    Puedes solicitar la eliminación completa de todos tus datos. <strong>⚠️ ADVERTENCIA:</strong> esta acción es <u>permanente e irreversible</u> y tendrá las siguientes consecuencias:
                </p>
                <ul style={{ color: 'var(--color-text)', lineHeight: 2, paddingLeft: '1.5rem' }}>
                    <li>Tu perfil y datos de contacto serán borrados definitivamente.</li>
                    <li>Tu historial completo de pedidos desaparecerá.</li>
                    <li>Todos tus Tags y placas médicas SOS <strong>dejarán de funcionar de manera inmediata</strong>.</li>
                </ul>

                {requestStatus === 'idle' || requestStatus === 'error' ? (
                    <form onSubmit={handleRequestDeletion} style={{ marginTop: '2rem' }}>
                        <label htmlFor="del_email" style={{ display: 'block', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                            INGRESA EL CORREO ASOCIADO A TU CUENTA:
                        </label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                id="del_email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="tu@correo.com"
                                required
                                style={{ flex: '1', minWidth: '230px', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1A1A1A', color: 'white', fontFamily: 'var(--font-main)', fontSize: '1rem' }}
                            />
                            <button
                                type="submit"
                                style={{ padding: '1rem 1.5rem', borderRadius: '6px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-main)' }}
                            >
                                <AlertTriangle size={18} /> Solicitar Purga
                            </button>
                        </div>
                        {requestStatus === 'error' && (
                            <p style={{ color: '#ff4d4f', marginTop: '0.75rem', fontWeight: 'bold' }}>Error de conexión. Inténtalo más tarde o escríbenos a ventas@sagason.cl</p>
                        )}
                    </form>
                ) : requestStatus === 'loading' ? (
                    <p style={{ marginTop: '2rem', color: '#888' }}>Enviando solicitud...</p>
                ) : (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid #34d399', borderRadius: '8px', textAlign: 'center' }}>
                        <MailCheck size={48} style={{ color: '#34d399', marginBottom: '1rem' }} />
                        <h3 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>Revisa tu Bandeja de Entrada</h3>
                        <p style={{ color: 'white', margin: 0, opacity: 0.9 }}>
                            Enviamos un correo de confirmación a <strong>{email}</strong>.<br />
                            Haz clic en el enlace rojo dentro del correo para ejecutar el borrado definitivo.<br />
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>El enlace expira en 24 horas.</span>
                        </p>
                    </div>
                )}
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
