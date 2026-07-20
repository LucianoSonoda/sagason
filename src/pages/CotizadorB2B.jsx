import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, Building, Mail, Phone, User, CheckCircle } from 'lucide-react';

export default function CotizadorB2B() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/prices')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const loadedProducts = data.map(p => ({
            id: p.websiteCode || p.name,
            name: p.name,
            basePrice: p.basePrice || 0
          }));
          setProducts(loadedProducts);
          if (loadedProducts.length > 0) {
            setFormData(prev => ({ ...prev, productId: loadedProducts[0].id }));
          }
        }
      })
      .catch(err => console.log('Error fetching B2B prices:', err));
  }, []);
  
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 50,
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Calcula la cotización en vivo (simulado o via API si quisiéramos)
  useEffect(() => {
    calculateLiveQuote();
  }, [formData.productId, formData.quantity]);

  const calculateLiveQuote = () => {
    const p = products.find(prod => prod.id === formData.productId);
    if (!p) return;

    let discountPercent = 0;
    if (formData.quantity >= 10 && formData.quantity < 50) discountPercent = 10;
    if (formData.quantity >= 50 && formData.quantity < 100) discountPercent = 20;
    if (formData.quantity >= 100) discountPercent = 30;

    const subtotal = p.basePrice * formData.quantity;
    const discountAmount = subtotal * (discountPercent / 100);
    
    setQuote({
      productName: p.name,
      basePrice: p.basePrice,
      quantity: formData.quantity,
      subtotal,
      discountPercent,
      discountAmount,
      finalTotal: subtotal - discountAmount
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/b2b-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: formData.productId,
          quantity: formData.quantity,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company
          }
        })
      });

      if (!res.ok) throw new Error('Error al enviar la cotización');
      
      const data = await res.json();
      setQuote(data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Lado Izquierdo: Formulario */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Regalos Corporativos (B2B)</h1>
          <p className="text-gray-400 mb-8">
            En Sagason somos especialistas en merchandising premium y regalos corporativos memorables. 
            Cotiza en línea y obtén descuentos exclusivos por volumen al instante.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 border border-white/10 p-8 rounded-2xl shadow-2xl">
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Producto de Interés</label>
                <select 
                  name="productId" 
                  value={formData.productId} 
                  onChange={handleInputChange}
                  className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {products.length === 0 && <option>Cargando productos...</option>}
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - Desde ${p.basePrice.toLocaleString('es-CL')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cantidad: <span className="text-white font-bold">{formData.quantity} unidades</span>
                </label>
                <input 
                  type="range" 
                  name="quantity"
                  min="1" 
                  max="500" 
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full accent-blue-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span>1</span>
                  <span>10 (10% Dcto)</span>
                  <span>50 (20% Dcto)</span>
                  <span>100+ (30% Dcto)</span>
                </div>
              </div>

              <hr className="border-white/10 my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      required type="text" name="name" placeholder="Ej: Juan Pérez"
                      value={formData.name} onChange={handleInputChange}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Empresa / Organización</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      required type="text" name="company" placeholder="Ej: Acme Corp"
                      value={formData.company} onChange={handleInputChange}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      required type="email" name="email" placeholder="correo@empresa.cl"
                      value={formData.email} onChange={handleInputChange}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      required type="tel" name="phone" placeholder="+56 9 1234 5678"
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full bg-gray-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors mt-6 disabled:opacity-50"
              >
                {loading ? 'Generando Cotización...' : 'Enviar Requerimiento Oficial'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <div className="bg-green-900/20 border border-green-500/30 p-12 rounded-2xl text-center flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">¡Cotización Enviada!</h2>
              <p className="text-gray-300">
                Hemos recibido tu requerimiento a nombre de <strong>{formData.company}</strong>. 
                Tu número de cotización preliminar está reflejado a la derecha. Un ejecutivo se contactará contigo a la brevedad.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
              >
                Hacer otra cotización
              </button>
            </div>
          )}
        </div>

        {/* Lado Derecho: Calculadora en Vivo */}
        <div className="lg:pl-8">
          <div className="sticky top-32">
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-1 rounded-2xl">
              <div className="bg-gray-950 rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-8 h-8 text-blue-500" />
                  <h3 className="text-2xl font-bold text-white">Resumen de Cotización</h3>
                </div>

                {quote ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-gray-400">Producto</span>
                      <span className="text-white text-right max-w-[60%]">{quote.productName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-gray-400">Cantidad (Unidades)</span>
                      <span className="text-white font-bold text-lg">{quote.quantity}</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-gray-400">Precio Unitario Base</span>
                      <span className="text-white">${quote.basePrice.toLocaleString('es-CL')}</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">${quote.subtotal.toLocaleString('es-CL')}</span>
                    </div>

                    {quote.discountPercent > 0 && (
                      <div className="flex justify-between items-center pb-4 border-b border-white/10 bg-green-900/10 -mx-8 px-8 py-2">
                        <span className="text-green-400 font-medium">Descuento Corporativo ({quote.discountPercent}%)</span>
                        <span className="text-green-400 font-bold">- ${quote.discountAmount.toLocaleString('es-CL')}</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <div className="flex justify-between items-end">
                        <span className="text-gray-300 text-lg">Total Estimado</span>
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          ${quote.finalTotal.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <p className="text-right text-xs text-gray-500 mt-2">* Valores aproximados sin IVA. Sujetos a factibilidad de stock y diseño.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Selecciona un producto y cantidad para ver el cálculo en vivo.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
