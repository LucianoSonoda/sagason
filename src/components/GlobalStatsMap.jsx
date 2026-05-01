import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  Line
} from "react-simple-maps";
import { Users, Shield, Award, Globe } from 'lucide-react';
import './GlobalStatsMap.css';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const COUNTRY_COORDS = {
    "Brasil": [-51.9253, -14.235], "Brazil": [-51.9253, -14.235], "BR": [-51.9253, -14.235],
    "Chile": [-71.543, -35.6751], "CL": [-71.543, -35.6751],
    "Argentina": [-63.6167, -38.4161], "AR": [-63.6167, -38.4161],
    "Italia": [12.5674, 41.8719], "Italy": [12.5674, 41.8719], "IT": [12.5674, 41.8719],
    "Japón": [138.2529, 36.2048], "Japon": [138.2529, 36.2048], "Japan": [138.2529, 36.2048], "JP": [138.2529, 36.2048],
    "España": [-3.7492, 40.4637], "Spain": [-3.7492, 40.4637], "ES": [-3.7492, 40.4637],
    "USA": [-95.7129, 37.0902], "EEUU": [-95.7129, 37.0902], "United States": [-95.7129, 37.0902], "US": [-95.7129, 37.0902],
    "Canadá": [-106.3468, 56.1304], "Canada": [-106.3468, 56.1304], "CA": [-106.3468, 56.1304],
    "México": [-102.5528, 23.6345], "Mexico": [-102.5528, 23.6345], "MX": [-102.5528, 23.6345],
    "Francia": [2.2137, 46.2276], "France": [2.2137, 46.2276], "FR": [2.2137, 46.2276],
    "Alemania": [10.4515, 51.1657], "Germany": [10.4515, 51.1657], "DE": [10.4515, 51.1657],
    "UK": [-3.436, 55.3781], "United Kingdom": [-3.436, 55.3781], "GB": [-3.436, 55.3781],
    "Colombia": [-74.2973, 4.5709], "CO": [-74.2973, 4.5709],
    "Perú": [-75.0152, -9.19], "Peru": [-75.0152, -9.19], "PE": [-75.0152, -9.19],
    "Uruguay": [-55.7658, -32.5228], "UY": [-55.7658, -32.5228],
    "Paraguay": [-58.4438, -23.4425], "PY": [-58.4438, -23.4425],
    "Bolivia": [-63.5887, -16.2902], "BO": [-63.5887, -16.2902],
    "Ecuador": [-78.1834, -1.8312], "EC": [-78.1834, -1.8312],
    "Venezuela": [-66.5897, 6.4238], "VE": [-66.5897, 6.4238],
    "China": [104.1954, 35.8617], "CN": [104.1954, 35.8617],
    "Rusia": [105.3188, 61.524], "Russia": [105.3188, 61.524], "RU": [105.3188, 61.524],
    "Australia": [133.7751, -25.2744], "AU": [133.7751, -25.2744],
    "India": [78.9629, 20.5937], "IN": [78.9629, 20.5937],
    "Panamá": [-80.7821, 8.538], "Panama": [-80.7821, 8.538], "PA": [-80.7821, 8.538],
    "Costa Rica": [-83.7534, 9.7489], "CR": [-83.7534, 9.7489],
    "Suiza": [8.2275, 46.8182], "Switzerland": [8.2275, 46.8182], "CH": [8.2275, 46.8182],
    "Otros": [0, 20]
};

export function GlobalStatsMap() {
    const [stats, setStats] = useState({ total_active: 0, total_donated: 0, countries: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('https://s4k.sagason.cl/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'get_public_stats' })
                });
                const data = await res.json();
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching global stats:", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const getRadius = (count) => {
        if (!count) return 0;
        return 3 + Math.sqrt(count) * 2;
    };

    return (
        <div className="global-map-container">
            <div className="map-header">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="stat-card glass-panel"
                >
                    <div className="stat-icon-bg primary">
                        <Users size={24} className="text-primary" />
                    </div>
                    <div className="stat-info">
                        <span className="stat-num">{stats.total_active}</span>
                        <span className="stat-label">Dispositivos Activos</span>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="stat-card glass-panel"
                >
                    <div className="stat-icon-bg success">
                        <Award size={24} className="text-success" />
                    </div>
                    <div className="stat-info">
                        <span className="stat-num">{stats.total_donated}</span>
                        <span className="stat-label">Impacto Social</span>
                    </div>
                </motion.div>
            </div>

            <div className="map-visual-wrapper glass-panel">
                <ComposableMap 
                    projectionConfig={{ scale: 180 }}
                    style={{ width: "100%", height: "auto" }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#1e293b"
                                    stroke="#334155"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#334155", outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    {/* Render prop to access projection for straight lines */}
                    {({ projection }) => {
                        const chileCoords = COUNTRY_COORDS["Chile"];
                        const [chileX, chileY] = projection(chileCoords);

                        return Object.entries(stats.countries || {}).map(([rawCountry, count]) => {
                            const country = rawCountry.trim();
                            const norm = country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            
                            let coords = COUNTRY_COORDS[country] || COUNTRY_COORDS["Otros"];
                            if (coords === COUNTRY_COORDS["Otros"]) {
                                const matchKey = Object.keys(COUNTRY_COORDS).find(k => 
                                    k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === norm
                                );
                                if (matchKey) coords = COUNTRY_COORDS[matchKey];
                            }
                            
                            const radius = getRadius(count);
                            const isChile = country === "Chile" || norm === "chile";
                            const [targetX, targetY] = projection(coords);

                            return (
                                <React.Fragment key={country}>
                                    {!isChile && (
                                        <motion.line
                                            x1={chileX}
                                            y1={chileY}
                                            x2={targetX}
                                            y2={targetY}
                                            stroke="#0ea5e9"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeDasharray="4 4"
                                            className="map-line-dash"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 0.5 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            style={{ pointerEvents: "none" }}
                                        />
                                    )}
                                    
                                    <Marker coordinates={coords}>
                                        <motion.circle
                                            r={radius}
                                            fill="#0ea5e9"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="map-marker-glow"
                                        />
                                        <circle
                                            r={radius * 2.5}
                                            fill="#0ea5e9"
                                            opacity="0.1"
                                            className="map-marker-pulse"
                                        />
                                        <text
                                            textAnchor="middle"
                                            y={-radius - 5}
                                            style={{ 
                                                fontFamily: "Inter, sans-serif", 
                                                fill: "white", 
                                                fontSize: "10px",
                                                fontWeight: "600",
                                                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                                            }}
                                        >
                                            {country}
                                        </text>
                                    </Marker>
                                </React.Fragment>
                            );
                        });
                    }}
                </ComposableMap>
                
                {loading && (
                    <div className="map-loader">
                        <Globe size={40} className="spin-slow" />
                        <span>Sincronizando red 4K...</span>
                    </div>
                )}

                <div className="map-footer-overlay">
                    <Shield size={16} />
                    <span>Red de Protección Global Sagason &copy; 2026</span>
                </div>
            </div>
        </div>
    );
}
