import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Utensils, TreePine, Map, PlusCircle } from 'lucide-react';

export function DiscoverCity() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ city: "tu ciudad", country: "" });
  
  useEffect(() => {
    // 1. Fetch geo location
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then(res => res.json())
      .then(geo => {
        const lat = parseFloat(geo.latitude);
        const lon = parseFloat(geo.longitude);
        setUserLocation({ city: geo.city || "tu ciudad", country: geo.country });
        
        // 2. Fetch from Google Places API (2 parallel requests for diversity)
        const today = new Date().toISOString().split('T')[0];
        const cachedDate = localStorage.getItem("sagasonAdvCultDate");
        const cachedData = localStorage.getItem("sagasonAdvCultData");

        if (cachedDate === today && cachedData) {
            setPlaces(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
        const url = "https://places.googleapis.com/v1/places:searchNearby";
        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.rating,places.primaryType,places.userRatingCount,places.shortFormattedAddress"
        };
        
        // Carga 1: Parques, Museos y Vida Natural (20 max)
        const p1 = fetch(url, {
            method: "POST", headers, body: JSON.stringify({
                includedTypes: ["park", "museum", "amusement_park", "zoo", "aquarium"],
                maxResultCount: 20,
                locationRestriction: { circle: { center: { latitude: lat, longitude: lon }, radius: 15000.0 } }
            })
        }).then(res => res.json());

        // Carga 2: Lugares Históricos y Emblemáticos (20 max)
        const p2 = fetch(url, {
            method: "POST", headers, body: JSON.stringify({
                includedTypes: ["tourist_attraction", "historical_landmark", "national_park"],
                maxResultCount: 20,
                locationRestriction: { circle: { center: { latitude: lat, longitude: lon }, radius: 15000.0 } }
            })
        }).then(res => res.json());

        Promise.all([p1, p2])
            .then(([res1, res2]) => {
                const combined = [
                    ...(res1.places || []),
                    ...(res2.places || [])
                ];

                // --- FALLBACK DATA: Si la API no devuelve nada o falla ---
                const FALLBACK_PLACES = [
                    { title: "Parque Bicentenario", rating: 4.8, type: "park", address: "Av. Bicentenario 3236, Vitacura" },
                    { title: "Araucano Park", rating: 4.7, type: "park", address: "Pdte. Riesco 5877, Las Condes" },
                    { title: "Mirador Interactive Museum", rating: 4.7, type: "museum", address: "Av. Punta Arenas 6711, La Granja" },
                    { title: "Metropolitan Park (Cerro San Cristóbal)", rating: 4.8, type: "park", address: "Santiago" },
                    { title: "Sky Costanera", rating: 4.6, type: "tourist_attraction", address: "Av. Andrés Bello 2425, Providencia" },
                    { title: "Bahá'í Temple of South America", rating: 4.9, type: "tourist_attraction", address: "Peñalolén" },
                    { title: "National Museum of Natural History", rating: 4.7, type: "museum", address: "Parque Quinta Normal" },
                    { title: "Forestal Park", rating: 4.5, type: "park", address: "Santiago Centro" }
                ];

                const sourcePlaces = combined.length > 0 ? combined : [];
                
                let validSpots = [];
                
                if (sourcePlaces.length > 0) {
                    validSpots = sourcePlaces
                        .filter(p => p.rating && p.rating >= 4.0 && p.userRatingCount > 10)
                        .map(p => ({
                            title: p.displayName?.text || "Lugar Destacado",
                            rating: p.rating,
                            reviews: p.userRatingCount,
                            type: p.primaryType,
                            address: p.shortFormattedAddress || ""
                        }));
                }

                // Mezclar con fallbacks si hay pocos resultados
                if (validSpots.length < 5) {
                    validSpots = [...validSpots, ...FALLBACK_PLACES];
                }

                // Eliminar duplicados por título
                validSpots = validSpots.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);

                // Sort por estrellas y tomar 30 exactos
                const top30 = validSpots.sort((a,b) => b.rating - a.rating).slice(0, 30);
                
                localStorage.setItem("sagasonAdvCultDate", today);
                localStorage.setItem("sagasonAdvCultData", JSON.stringify(top30));
                
                setPlaces(top30);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load adventures", err);
                // Si falla la API por completo, usar fallbacks
                const FALLBACK_PLACES = [
                    { title: "Parque Bicentenario", rating: 4.8, type: "park", address: "Vitacura" },
                    { title: "Araucano Park", rating: 4.7, type: "park", address: "Las Condes" },
                    { title: "Mirador Interactive Museum", rating: 4.7, type: "museum", address: "La Granja" },
                    { title: "Metropolitan Park", rating: 4.8, type: "park", address: "Santiago" },
                    { title: "Sky Costanera", rating: 4.6, type: "tourist_attraction", address: "Providencia" }
                ];
                setPlaces(FALLBACK_PLACES);
                setLoading(false);
            });
      })
      .catch(() => setLoading(false));
  }, []);

  const getTypeIcon = (type) => {
    if (!type) return <MapPin size={28} />;
    if (type.includes('historical') || type.includes('museum')) return <Map size={28} color="#f59e0b" />;
    if (type.includes('park') || type.includes('zoo') || type.includes('botanical')) return <TreePine size={28} color="#10b981" />;
    return <MapPin size={28} color="#3b82f6" />;
  };

  const getTagRecommendation = (type) => {
    if (!type) return "Recuerdo Familiar";
    if (type.includes('historical')) return "Patrimonio Cultural";
    if (type.includes('park') || type.includes('national_park')) return "Aventura al Aire Libre";
    return "Cultura y Familia";
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="promo-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>ESPECIAL SAGASON</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', lineHeight: 1.1, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Aventuras en <span style={{ color: '#fff' }}>Familia</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Descubre los {places.length > 0 ? places.length : 'mejores'} rincones mejor valorados (4+ ⭐) en {userLocation.city} para disfrutar de forma segura y Premium.
                </p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '20px' }}>
                        <Map size={48} color="var(--color-primary)" opacity={0.5} />
                    </motion.div>
                    <h3 style={{ color: 'var(--color-text)', opacity: 0.8 }}>Sincronizando radares VIP...</h3>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' 
                }}>
                    <AnimatePresence>
                        {places.map((spot, idx) => (
                            <motion.div 
                                key={spot.title + idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-panel"
                                style={{
                                    padding: '24px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(14,165,233,0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'linear-gradient(145deg, rgba(14,165,233,0.05) 0%, rgba(0,0,0,0.4) 100%)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                            {getTypeIcon(spot.type)}
                                        </div>
                                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontWeight: 800, color: '#f59e0b' }}>{spot.rating}</span>
                                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                        </div>
                                    </div>
                                    
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: '#fff', lineHeight: 1.3 }}>
                                        {spot.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={14} /> {spot.address || `${userLocation.city}`}
                                    </p>
                                </div>

                                {/* Sagason Upsell CTA */}
                                <div style={{ 
                                    marginTop: '20px', 
                                    paddingTop: '20px', 
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                }}>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', fontStyle: 'italic' }}>
                                        Recomendación Sagason: Insignia <strong>{getTagRecommendation(spot.type)}</strong>
                                    </p>
                                    <Link to={`/insignia?lugar=${encodeURIComponent(spot.title)}`} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        width: '100%', padding: '10px 0',
                                        background: 'rgba(14,165,233,0.1)',
                                        border: '1px solid var(--color-primary)',
                                        color: 'var(--color-primary)',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.1)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                    >
                                        <PlusCircle size={16} /> Inmortalizar Insignia
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    </div>
  );
}
