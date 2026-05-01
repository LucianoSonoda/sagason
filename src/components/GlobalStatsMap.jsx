import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from "react-simple-maps";
import { Users, Shield, Award, Globe } from 'lucide-react';
import './GlobalStatsMap.css';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const COUNTRY_COORDS = {
    "Chile": [-71.543, -35.6751],
    "Argentina": [-63.6167, -38.4161],
    "Perú": [-75.0152, -9.19],
    "Colombia": [-74.2973, 4.5709],
    "México": [-102.5528, 23.6345],
    "España": [-3.7492, 40.4637],
    "USA": [-95.7129, 37.0902],
    "Canadá": [-106.3468, 56.1304],
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

                    {Object.entries(stats.countries || {}).map(([country, count]) => {
                        const coords = COUNTRY_COORDS[country] || COUNTRY_COORDS["Otros"];
                        const radius = getRadius(count);
                        return (
                            <Marker key={country} coordinates={coords}>
                                <motion.circle
                                    r={radius}
                                    fill="var(--primary)"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="map-marker-glow"
                                />
                                <circle
                                    r={radius * 2.5}
                                    fill="var(--primary)"
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
                        );
                    })}
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
