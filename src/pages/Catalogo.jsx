import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, ChevronDown, ChevronUp, Shield, Info, Ruler,
  Layers, Star, ArrowRight, Search, X
} from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, getProductsByCategory } from '../data/products';
import '../styles/Catalogo.css';

// ─────────────────────────────────────────────────────────
//  Componente: Card de producto
// ─────────────────────────────────────────────────────────
function ProductCard({ product, price }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState('desc'); // 'desc' | 'sizes' | 'care'
  const catInfo = PRODUCT_CATEGORIES.find(c => c.id === product.category);

  return (
    <motion.div
      className="product-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Header de la card ── */}
      <div
        className="product-card__header"
        style={{ '--cat-color': catInfo?.color || '#0EA5E9' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="product-card__title-row">
          <span className="product-card__icon">{catInfo?.icon}</span>
          <div className="product-card__title-block">
            <h3 className="product-card__name">{product.name}</h3>
            <span
              className="product-card__category"
              style={{ color: catInfo?.color }}
            >
              {catInfo?.label}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            {product.tag && (
              <span
                className="product-card__tag"
                style={{ background: product.tagColor || '#0EA5E9' }}
              >
                {product.tag}
              </span>
            )}
            {price && (
              <span
                className="product-card__price"
                style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}
              >
                ${price.toLocaleString('es-CL')}
              </span>
            )}
          </div>
        </div>
        <p className="product-card__short-desc">{product.shortDesc}</p>
        <button className="product-card__toggle" aria-label="Expandir">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* ── Detalle expandible ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="product-card__detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <div className="product-card__tabs">
              <button
                className={`pcard-tab ${tab === 'desc' ? 'active' : ''}`}
                onClick={() => setTab('desc')}
              >
                <Info size={14} /> Descripción
              </button>
              <button
                className={`pcard-tab ${tab === 'sizes' ? 'active' : ''}`}
                onClick={() => setTab('sizes')}
              >
                <Ruler size={14} /> Tallas y Material
              </button>
              <button
                className={`pcard-tab ${tab === 'care' ? 'active' : ''}`}
                onClick={() => setTab('care')}
              >
                <Shield size={14} /> Cuidados
              </button>
            </div>

            {/* Tab content wrapped in AnimatePresence for proper enter/exit coordination */}
            <AnimatePresence mode="wait">
              {tab === 'desc' && (
                <motion.div
                  key="desc"
                  className="pcard-tab-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <p className="pcard-description">{product.description}</p>
                </motion.div>
              )}

              {tab === 'sizes' && (
                <motion.div
                  key="sizes"
                  className="pcard-tab-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="pcard-materials">
                    <Layers size={14} />
                    <span>{product.materials}</span>
                  </div>
                  <ul className="pcard-sizes">
                    {product.sizes.map((size, i) => (
                      <li key={i} className="pcard-size-item">
                        <span className="pcard-size-label">{size.label}</span>
                        <span className="pcard-size-detail">{size.detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {tab === 'care' && (
                <motion.div
                  key="care"
                  className="pcard-tab-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ul className="pcard-care-list">
                    {product.care.map((tip, i) => (
                      <li key={i} className="pcard-care-item">
                        <Shield size={13} className="care-icon" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="pcard-cta">
              <a
                href="/#custom"
                className="btn-pcard-order"
                style={{ '--btn-color': catInfo?.color || '#0EA5E9' }}
              >
                Pedir personalizado <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  Página: Catálogo
// ─────────────────────────────────────────────────────────
export function Catalogo() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState({});
  const searchRef = useRef(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL;
    if (!apiUrl) return;
    
    fetch(`${apiUrl}public`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const priceMap = {};
          data.data.forEach(item => {
            if (item.basePrice) {
              priceMap[item.productId] = item.basePrice;
            }
          });
          setPrices(priceMap);
        }
      })
      .catch(err => console.error("Error al cargar precios:", err));
  }, []);

  const filtered = PRODUCTS.filter(p => {
    const matchCat  = activeCategory === 'ALL' || p.category === activeCategory;
    const matchSearch = search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="catalogo-page">
      {/* Hero */}
      <section className="catalogo-hero">
        <motion.div
          className="catalogo-hero__content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="catalogo-hero__label">
            <Package size={14} /> CATÁLOGO COMPLETO
          </div>
          <h1 className="catalogo-hero__title">
            PRODUCTOS DE <span className="text-gradient">SUBLIMACIÓN</span>
          </h1>
          <p className="catalogo-hero__subtitle">
            Todos nuestros productos personalizados con descripciones completas,
            materiales, tallas disponibles e instrucciones de cuidado.
          </p>

          {/* Buscador */}
          <div className="catalogo-search">
            <Search size={16} className="catalogo-search__icon" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="catalogo-search__input"
            />
            {search && (
              <button
                className="catalogo-search__clear"
                onClick={() => { setSearch(''); searchRef.current?.focus(); }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Filtro de categorías */}
      <section className="catalogo-filters container">
        <div className="catalogo-filters__scroll">
          <button
            className={`cat-filter-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ALL')}
          >
            <Star size={13} /> Todo
          </button>
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ '--cat-c': cat.color }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de productos */}
      <section className="catalogo-grid container">
        {filtered.length === 0 ? (
          <motion.div
            className="catalogo-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Package size={48} className="catalogo-empty__icon" />
            <p>No se encontraron productos para "<strong>{search}</strong>"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('ALL'); }}>
              Ver todos los productos
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory + search}
            className="catalogo-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(product => (
              <ProductCard 
                key={product.productId} 
                product={product} 
                price={prices[product.productId]}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Nota de precios */}
      <section className="catalogo-price-note container">
        <div className="price-note-box glass-panel">
          <Info size={18} />
          <div>
            <strong>Cotiza tu idea</strong>
            <p>
              Los precios mostrados son referenciales o bases. Pueden variar según el diseño final, tamaño específico o cantidad de productos. Contáctanos por
              WhatsApp o usa el formulario de personalización para recibir una cotización
              exacta para tu pedido.
            </p>
          </div>
          <a href="/#custom" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Cotizar ahora <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
