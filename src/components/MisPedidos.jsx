import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Clock, CheckCircle, Package, Truck, AlertCircle } from 'lucide-react';

export default function MisPedidos() {
  const { user, token, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user && token) {
      fetchOrders();
    } else if (!loading && !user) {
      setFetching(false);
    }
  }, [user, token, loading]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Error cargando pedidos');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  const getStatusIcon = (state) => {
    switch (state?.toUpperCase()) {
      case 'RECIBIDO': return <ShoppingBag className="w-6 h-6 text-blue-500" />;
      case 'PAGADO': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'DISENO': return <Clock className="w-6 h-6 text-purple-500" />;
      case 'PRODUCCION': return <Package className="w-6 h-6 text-orange-500" />;
      case 'ACABADO': return <Package className="w-6 h-6 text-yellow-500" />;
      case 'ENVIADO': return <Truck className="w-6 h-6 text-blue-400" />;
      case 'ENTREGADO': return <CheckCircle className="w-6 h-6 text-emerald-600" />;
      default: return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = (state) => {
    switch (state?.toUpperCase()) {
      case 'RECIBIDO': return 'Recibido';
      case 'PAGADO': return 'Pagado';
      case 'DISENO': return 'En Diseño';
      case 'PRODUCCION': return 'En Producción';
      case 'ACABADO': return 'Acabados';
      case 'ENVIADO': return 'Enviado';
      case 'ENTREGADO': return 'Entregado';
      default: return state || 'Pendiente';
    }
  };

  if (loading || fetching) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '1.25rem' }}>Cargando tus pedidos...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ShoppingBag size={64} color="#6b7280" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Mis Pedidos</h2>
        <p style={{ color: '#9ca3af', maxWidth: '400px', marginBottom: '2rem' }}>
          Inicia sesión con tu cuenta de Google para poder hacer seguimiento en tiempo real al estado de tus compras.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', paddingLeft: '1rem', paddingRight: '1rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Mis Pedidos</h1>
            <p style={{ color: '#9ca3af' }}>Historial y estado de tus compras en Sagason.</p>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '12px', padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#f87171' }}>{error}</p>
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <ShoppingBag size={48} color="#4b5563" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Aún no tienes pedidos</h3>
            <p style={{ color: '#9ca3af' }}>Tus futuras compras aparecerán aquí para que puedas hacerles seguimiento.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order.id} className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                      Pedido realizado el {new Date(order.date).toLocaleDateString('es-CL', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                    <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white' }}>
                      Total: ${Math.round(order.totalAmount).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {getStatusIcon(order.orderState)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>
                      Estado: <span style={{ color: '#60a5fa' }}>{getStatusText(order.orderState)}</span>
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Productos</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {order.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#d1d5db' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '24px', height: '24px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                            {item.quantity}
                          </span>
                          <span>{item.recipeName || 'Producto Genérico'}</span>
                        </div>
                        <span style={{ color: '#6b7280' }}>
                          ${Math.round(item.unitPrice * item.quantity).toLocaleString('es-CL')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
