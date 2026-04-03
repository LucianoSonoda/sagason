import React, { useState } from 'react';
import { ShieldAlert, Trash2, MailCheck, AlertTriangle } from 'lucide-react';

export function Privacy() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleRequestDeletion = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://gmvj2qt2af.execute-api.sa-east-1.amazonaws.com/prod/privacy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section className="container" style={{ padding: '6rem 1rem', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <ShieldAlert size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-heading)' }}>
                    Políticas de Privacidad
                </h1>
                <p style={{ color: 'var(--color-text)', opacity: 0.8 }}>
                    En Sagason SpA respetamos tu privacidad y el cumplimiento de las normativas de protección de datos personales. 
                    Garantizamos que tus datos no serán vendidos ni compartidos con terceros, y están almacenados bajo estándares rigurosos de seguridad en la nube.
                </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 77, 79, 0.05)', border: '1px solid rgba(255, 77, 79, 0.3)', borderRadius: '12px', padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: '#ff4d4f', display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
                    <Trash2 /> Borrado Definitivo de Datos (RGPD)
                </h2>
                
                <p style={{ color: '#ffcccc', opacity: 0.9, lineHeight: 1.6 }}>
                    Si deseas que toda la información asociada a tu correo sea purgada de nuestros sistemas, puedes solicitarlo aquí. 
                    <strong> ADVERTENCIA:</strong> Esta acción borrará permanentemente tu historial de pedidos, tu perfil y <span style={{ textDecoration: 'underline' }}>desactivará instantáneamente</span> cualquier placa médica o Tag de emergencia (SOS) asociado a ti sin posibilidad de recuperación.
                </p>

                {status === 'idle' || status === 'error' ? (
                    <form onSubmit={handleRequestDeletion} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label htmlFor="deletion_email" style={{ fontWeight: 'bold', letterSpacing: '0.05em' }}>Correo a Eliminar:</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <input 
                                type="email" 
                                id="deletion_email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@correo.com" 
                                required
                                style={{ flex: '1', minWidth: '250px', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#1A1A1A', color: 'white', fontFamily: 'var(--font-main)' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff4d4f', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={18} /> Solicitar Purga
                            </button>
                        </div>
                        {status === 'error' && (
                            <p style={{ color: '#ff4d4f', marginTop: '0.5rem', fontWeight: 'bold' }}>Error de conexión. Inténtalo más tarde.</p>
                        )}
                    </form>
                ) : (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid #34d399', borderRadius: '8px', textAlign: 'center' }}>
                        <MailCheck size={48} style={{ color: '#34d399', margin: '0 auto 1rem auto' }} />
                        <h3 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>Verifica tu Bandeja de Entrada</h3>
                        <p style={{ color: 'white', margin: 0, opacity: 0.9 }}>
                            Por seguridad, te hemos enviado un correo a <strong>{email}</strong>. 
                            Deberás hacer clic en el enlace rojo dentro de ese correo para ejecutar la destrucción definitiva de los datos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
