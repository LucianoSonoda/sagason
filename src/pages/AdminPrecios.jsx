import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, Save, RefreshCw, ShieldCheck, DollarSign, AlertCircle } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { getProductPrices, updateProductPrice, formatPrice } from '../services/productService';
import '../styles/Catalogo.css';

const CLIENT_ID = "309943165939-is4u5ga8gaehh7cp0ge9kt5pj8dbkqv2.apps.googleusercontent.com";
const ADMIN_EMAIL = "brluson@gmail.com";

// ─────────────────────────────────────────────────────────
//  Pantalla de Login con Google
// ─────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);
      
      if (decoded.email === ADMIN_EMAIL) {
        // Intentar obtener precios para validar en el backend
        await getProductPrices(token);
        onLogin(token);
      } else {
        setError(`Acceso Denegado. La cuenta ${decoded.email} no tiene permisos.`);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error validando credenciales o conectando con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = () => {
    setError("Falló la autenticación con Google.");
  };

  return (
    <div className="admin-login-overlay">
      <motion.div
        className="admin-login-card glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Lock size={24} color="var(--color-primary)" />
          <div>
            <h2>Panel de Precios</h2>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.85rem' }}>Acceso exclusivo para administradores.</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)' }}>
              <RefreshCw size={20} className="spin" />
              <span>Verificando...</span>
            </div>
          ) : (
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                theme="filled_black"
                width="250"
              />
            </GoogleOAuthProvider>
          )}
        </div>

        {error && (
          <p className="admin-error">
            <AlertCircle size={13} style={{ display: 'inline', marginRight: '4px' }} />
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Fila de precio editable
// ─────────────────────────────────────────────────────────
function PriceRow({ product, priceData, adminToken, onUpdated }) {
  const catInfo = PRODUCT_CATEGORIES.find(c => c.id === product.category);

  // Estado local de edición
  const existingData = priceData || {};
  const [basePrice, setBasePrice] = useState(existingData.basePrice ?? '');
  const [notes, setNotes]         = useState(existingData.notes ?? '');
  const [saving, setSaving]       = useState(false);
  const [status, setStatus]       = useState('idle'); // idle | saving | saved | error

  // Resetear si llegan nuevos datos
  useEffect(() => {
    setBasePrice(existingData.basePrice ?? '');
    setNotes(existingData.notes ?? '');
    setStatus('idle');
  }, [priceData]);

  const handleSave = async () => {
    const price = parseFloat(basePrice);
    if (isNaN(price) || price < 0) return;
    setSaving(true);
    setStatus('saving');
    try {
      await updateProductPrice(adminToken, product.productId, price, {}, notes);
      setStatus('saved');
      onUpdated(product.productId, price, notes);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.85rem' }}>
            {product.name}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
            {product.productId}
          </span>
        </div>
      </td>
      <td>
        <span
          className="admin-cat-badge"
          style={{ background: catInfo?.color || '#555' }}
        >
          {catInfo?.icon} {catInfo?.label}
        </span>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>$</span>
          <input
            type="number"
            className="admin-price-input"
            value={basePrice}
            min={0}
            step={1000}
            onChange={e => setBasePrice(e.target.value)}
            placeholder="0"
          />
        </div>
      </td>
      <td>
        <input
          type="text"
          className="admin-notes-input"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notas opcionales..."
          maxLength={120}
        />
      </td>
      <td>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          {existingData.updatedAt
            ? new Date(existingData.updatedAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: '2-digit' })
            : '—'}
        </span>
      </td>
      <td>
        <button
          className={`admin-save-row-btn ${status === 'saved' ? 'success' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {status === 'saving' && <RefreshCw size={12} className="spin" />}
          {status === 'saved'  && '✓ Guardado'}
          {status === 'error'  && '✗ Error'}
          {(status === 'idle') && <><Save size={12} /> Guardar</>}
        </button>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────
//  Panel principal de precios
// ─────────────────────────────────────────────────────────
function AdminPanel({ adminToken, onLogout }) {
  const [priceMap, setPriceMap]   = useState({});
  const [loading, setLoading]     = useState(true);
  const [fetchError, setFetchError] = useState('');

  const loadPrices = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await getProductPrices(adminToken);
      // Convertir array a map { productId: {...} }
      const map = {};
      data.forEach(item => { map[item.productId] = item; });
      setPriceMap(map);
    } catch (err) {
      setFetchError(err.message || 'Error al cargar precios');
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  const handleUpdated = (productId, newPrice, newNotes) => {
    setPriceMap(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        basePrice: newPrice,
        notes: newNotes,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  // Agrupar por categoría
  const byCategory = PRODUCT_CATEGORIES.map(cat => ({
    ...cat,
    products: PRODUCTS.filter(p => p.category === cat.id),
  })).filter(cat => cat.products.length > 0);

  const totalRevealedValue = PRODUCTS.reduce((acc, p) => {
    const pd = priceMap[p.productId];
    return acc + (pd?.basePrice || 0);
  }, 0);

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="admin-precios-header">
        <div>
          <h1>💰 Gestión de Precios</h1>
          <p>
            {PRODUCTS.length} productos · {Object.keys(priceMap).length} con precio cargado
            {' · '}
            <span style={{ color: 'var(--color-accent)' }}>Acceso privado</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            className="admin-save-row-btn"
            onClick={loadPrices}
            disabled={loading}
          >
            <RefreshCw size={13} className={loading ? 'spin' : ''} /> Recargar
          </button>
          <button className="admin-logout-btn" onClick={onLogout}>
            <LogOut size={13} style={{ marginRight: '4px' }} /> Salir
          </button>
        </div>
      </div>

      {/* Error */}
      {fetchError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: '1rem',
            background: 'rgba(248,113,113,0.08)',
            border: '1px solid rgba(248,113,113,0.2)',
            borderRadius: 'var(--radius-sm)',
            color: '#f87171',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
          }}
        >
          <AlertCircle size={14} style={{ marginRight: '6px', display: 'inline' }} />
          {fetchError}
          {' '}
          <button
            onClick={loadPrices}
            style={{ color: '#f87171', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
          <RefreshCw size={24} className="spin" style={{ marginBottom: '0.5rem' }} />
          <p style={{ margin: 0 }}>Cargando precios desde DynamoDB...</p>
        </div>
      )}

      {/* Tabla por categorías */}
      {!loading && !fetchError && byCategory.map(cat => (
        <div key={cat.id} style={{ marginBottom: '2.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: cat.color,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {cat.icon} {cat.label}
          </h3>

          <div className="admin-prices-table-wrapper">
            <table className="admin-prices-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th style={{ minWidth: '140px' }}>Precio Base (CLP)</th>
                  <th>Notas</th>
                  <th>Actualizado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cat.products.map(product => (
                  <PriceRow
                    key={product.productId}
                    product={product}
                    priceData={priceMap[product.productId]}
                    adminToken={adminToken}
                    onUpdated={handleUpdated}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Footer info */}
      {!loading && !fetchError && (
        <div
          className="glass-panel"
          style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', color: 'var(--color-muted)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <strong style={{ color: 'var(--color-heading)' }}>Total productos:</strong>{' '}
            {PRODUCTS.length}
          </div>
          <div>
            <strong style={{ color: 'var(--color-heading)' }}>Cargados en DB:</strong>{' '}
            {Object.keys(priceMap).length}
          </div>
          <div>
            <strong style={{ color: 'var(--color-heading)' }}>Los precios son privados</strong>
            {' '}· Solo visibles con cuenta admin.
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
            <DollarSign size={11} style={{ display: 'inline' }} /> DynamoDB · Lambda
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  Página principal: AdminPrecios
// ─────────────────────────────────────────────────────────
export function AdminPrecios() {
  // Guardar token en sessionStorage (limpia al cerrar el tab)
  const [adminToken, setAdminToken] = useState(() =>
    sessionStorage.getItem('sagason_admin_token') || null
  );

  const handleLogin = (token) => {
    sessionStorage.setItem('sagason_admin_token', token);
    setAdminToken(token);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sagason_admin_token');
    setAdminToken(null);
  };

  return (
    <div className="admin-precios-page">
      {adminToken
        ? <AdminPanel adminToken={adminToken} onLogout={handleLogout} />
        : <AdminLogin onLogin={handleLogin} />
      }
    </div>
  );
}
