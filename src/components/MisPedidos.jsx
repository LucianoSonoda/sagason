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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-white text-xl">Cargando tus pedidos...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <ShoppingBag className="w-16 h-16 text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Mis Pedidos</h2>
        <p className="text-gray-400 text-center max-w-md mb-8">
          Inicia sesión con tu cuenta de Google para poder hacer seguimiento en tiempo real al estado de tus compras.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mis Pedidos</h1>
            <p className="text-gray-400">Historial y estado de tus compras en Sagason.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Aún no tienes pedidos</h3>
            <p className="text-gray-400">Tus futuras compras aparecerán aquí para que puedas hacerles seguimiento.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/50 hover:border-white/20 transition-colors">
                <div className="border-b border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Pedido realizado el {new Date(order.date).toLocaleDateString('es-CL', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                    <p className="text-lg font-semibold text-white">
                      Total: ${Math.round(order.totalAmount).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-950 px-4 py-2 rounded-full border border-white/5">
                    {getStatusIcon(order.orderState)}
                    <span className="text-sm font-medium text-white">
                      Estado: <span className="text-blue-400">{getStatusText(order.orderState)}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Productos</h4>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between text-gray-300">
                        <div className="flex items-center gap-3">
                          <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <span>{item.recipeName || 'Producto Genérico'}</span>
                        </div>
                        <span className="text-gray-500">
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
