import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { LaserSticker } from './LaserSticker';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const CLIENT_ID = "309943165939-is4u5ga8gaehh7cp0ge9kt5pj8dbkqv2.apps.googleusercontent.com";
const ADMIN_EMAIL = "brluson@gmail.com";

export function LaserLock() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState("");

    const handleLoginSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            if (decoded.email === ADMIN_EMAIL) {
                setIsAuthenticated(true);
                setAuthError("");
            } else {
                setAuthError(`Acceso Denegado. La cuenta ${decoded.email} no tiene permisos de administrador.`);
            }
        } catch (error) {
            console.error(error);
            setAuthError("Error validando el token de seguridad.");
        }
    };

    const handleLoginError = () => {
        setAuthError("Falló la autenticación con Google.");
    };

    if (isAuthenticated) {
        return <LaserSticker />;
    }

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', fontFamily: 'monospace', padding: '2rem' }}>
                <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', border: '1px solid #333', padding: '3rem', backgroundColor: '#111', borderRadius: '8px' }}>
                    <ShieldAlert size={48} color="#f59e0b" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Restricted Access</h2>
                    <p style={{ color: '#888', fontSize: '12px', marginBottom: '2rem' }}>Este módulo es de uso interno exclusivo (Agente Heráldico). Identifíquese para continuar.</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                            theme="filled_black"
                            width="250"
                        />
                    </div>
                    
                    {authError && (
                        <p style={{ color: '#ef4444', fontSize: '12px', textTransform: 'uppercase', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {authError}
                        </p>
                    )}
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
