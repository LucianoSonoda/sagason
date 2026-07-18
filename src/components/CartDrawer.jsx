import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, ShoppingCart, MessageSquare, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, isDrawerOpen, setIsDrawerOpen, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerRut, setCustomerRut] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingRegion, setShippingRegion] = useState('metropolitana');

  const REGIONES = [
      { id: 'retiro', name: 'Retiro en Taller (Vitacura) - $0', cost: 0 },
      { id: 'metropolitana', name: 'Región Metropolitana - $3.100', cost: 3100 },
      { id: 'normal', name: 'Otras Regiones - $4.300', cost: 4300 },
      { id: 'extrema', name: 'Regiones Extremas (Arica, Tarapacá, Aysén, Magallanes) - $5.200', cost: 5200 }
  ];

  // Pre-fill from Google Auth if logged in
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name || '');
      if (!customerEmail) setCustomerEmail(user.email || '');
    }
  }, [user]);

  // Reset mode when drawer closes
  useEffect(() => {
    if (!isDrawerOpen) {
      setIsCheckoutMode(false);
    }
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const shippingCost = REGIONES.find(r => r.id === shippingRegion)?.cost || 0;
  const grandTotal = cartTotal + shippingCost;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would integrate Webpay/Flow here.
    // For now, we simulate a successful order and clear the cart.
    const orderData = {
      items: cart,
      customer: {
        name: customerName,
        rut: customerRut,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress
      },
      shipping: shippingRegion,
      total: grandTotal
    };

    console.log("Procesando Orden:", orderData);
    
    // Mock successful checkout
    alert('¡Orden enviada con éxito por un total de: $' + grandTotal.toLocaleString());
    clearCart();
    setIsDrawerOpen(false);
    navigate('/exito');
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9998
        }}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '450px',
          maxWidth: '100%',
          height: '100%',
          backgroundColor: 'var(--color-bg, #1a1a1a)',
          color: 'var(--color-text, #fff)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.5)',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart /> {isCheckoutMode ? 'Finalizar Compra' : 'Tu Carrito'}
          </h2>
          <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : !isCheckoutMode ? (
            // Cart Items View
            cart.map(item => (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '15px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#aaa' }}>${item.price.toLocaleString()}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ background: '#333', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ background: '#333', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            // Checkout Form View
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                      <MessageSquare size={18} /> Datos de Contacto
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Nombre Completo *</label>
                          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                      </div>
                      <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Correo Electrónico *</label>
                          <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>RUT *</label>
                            <input type="text" value={customerRut} onChange={(e) => setCustomerRut(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Teléfono *</label>
                            <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                        </div>
                      </div>
                      <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Dirección de Envío *</label>
                          <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                      </div>
                  </div>
              </div>

              <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: '#aaa' }}>
                      <Truck size={16} /> Envío
                  </label>
                  <select 
                      value={shippingRegion} 
                      onChange={(e) => setShippingRegion(e.target.value)} 
                      style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '8px', 
                          border: '1px solid rgba(255,255,255,0.2)', 
                          background: 'rgba(255,255,255,0.08)', 
                          color: 'white' 
                      }}
                  >
                      {REGIONES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
              </div>
            </form>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ marginTop: '20px', borderTop: '2px solid #333', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '10px', color: '#aaa' }}>
              <span>Subtotal:</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            {isCheckoutMode && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '10px', color: '#aaa' }}>
                <span>Envío:</span>
                <span>${shippingCost.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
              <span>Total a Pagar:</span>
              <span>${isCheckoutMode ? grandTotal.toLocaleString() : cartTotal.toLocaleString()}</span>
            </div>
            
            {!isCheckoutMode ? (
              <button 
                onClick={() => setIsCheckoutMode(true)}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: 'var(--color-primary, #0EA5E9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Proceder al Pago
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setIsCheckoutMode(false)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Volver
                </button>
                <button 
                  type="submit"
                  form="checkout-form"
                  style={{
                    flex: 2,
                    padding: '15px',
                    backgroundColor: '#10B981', // green for pay
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Pagar Ahora
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
