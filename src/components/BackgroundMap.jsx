import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// Resolucion TopoJSON de paises
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export function BackgroundMap() {
  const [location, setLocation] = useState(null);
  const [touristSpots, setTouristSpots] = useState([]);

  useEffect(() => {
    // 1. Fetch Location
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then(res => res.json())
      .then(data => {
        const lat = parseFloat(data.latitude);
        const lon = parseFloat(data.longitude);
        
        setLocation({
          lat,
          lon,
          country: data.country,
          city: data.city
        });

        // 2. Google Places Local Caching & Fetching
        const today = new Date().toISOString().split('T')[0];
        const cachedDate = localStorage.getItem("sagasonMapPlacesDate");
        const cachedData = localStorage.getItem("sagasonMapPlacesData");

        let fetchedSpotsPromise;

        if (cachedDate === today && cachedData) {
          // Load valid spots from today's cache (avoids burning Google API quota)
          fetchedSpotsPromise = Promise.resolve(JSON.parse(cachedData));
        } else {
          // Fetch from Google Places API (New)
          const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
          const url = "https://places.googleapis.com/v1/places:searchNearby";
          
          const payload = {
            includedTypes: ["restaurant", "museum", "park", "tourist_attraction"],
            maxResultCount: 20,
            locationRestriction: {
              circle: {
                center: { latitude: lat, longitude: lon },
                radius: 10000.0 // 10km radius
              }
            }
          };

          fetchedSpotsPromise = fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "places.displayName,places.rating"
            },
            body: JSON.stringify(payload)
          })
          .then(res => res.json())
          .then(placesData => {
            if (placesData && placesData.places) {
              // Filter mathematically for 4+ stars
              const validSpots = placesData.places
                .filter(p => p.rating && p.rating >= 4.0)
                .map(p => ({
                   title: p.displayName?.text || "Lugar Destacado",
                   rating: p.rating
                }));
              
              localStorage.setItem("sagasonMapPlacesDate", today);
              localStorage.setItem("sagasonMapPlacesData", JSON.stringify(validSpots));
              
              return validSpots;
            }
            return [];
          });
        }
        
        fetchedSpotsPromise.then(spots => {
          if (spots && spots.length > 0) {
            // Shuffle dynamically and pick 5 on every page refresh!
            const shuffled = spots.sort(() => 0.5 - Math.random());
            setTouristSpots(shuffled.slice(0, 5));
          }
        });

      })
      .catch((err) => {
        console.error("Geo or Google fetching failed", err);
        // Fallback
        setLocation({ lat: -33.4489, lon: -70.6693, country: "Chile", city: "Santiago" });
      });
  }, []);

  if (!location) return null;

  return (
    <div className="dynamic-map-wrapper">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          scale: 1800,  // Vista a nivel nacional
          center: [location.lon, location.lat]
        }}
        style={{
          width: "100%",
          height: "100%",
          animation: "mapBreathing 35s infinite alternate cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#0f172a"
                stroke="var(--color-primary)" // Subtle styling for borders
                strokeWidth={0.25}
                strokeLinecap="round"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Tourist Spots HUD - Displayed as a tech list panel at national scale */}
        {touristSpots.length > 0 && (
            <Marker coordinates={[location.lon, location.lat]}>
              <text x={18} y={-45} style={{ fontFamily: "var(--font-main)", fill: "#f97316", fontSize: 9, fontWeight: "600", letterSpacing: "1px", textShadow: "0px 0px 4px rgba(0,0,0,0.9)" }}>
                PUNTOS DE INTERÉS:
              </text>
              {touristSpots.map((spot, index) => (
                <text
                  key={`spot-${index}`}
                  x={18}
                  y={-30 + (index * 12)}
                  style={{
                    fontFamily: "var(--font-main)",
                    fill: "#fdba74",
                    fontSize: 8.5,
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                    opacity: 0.9,
                    textShadow: "0px 0px 4px rgba(0,0,0,0.9)"
                  }}
                >
                  • {spot.title} ({spot.rating} ⭐)
                </text>
              ))}
            </Marker>
        )}

        {/* Main User Location Beacon */}
        <Marker coordinates={[location.lon, location.lat]}>
          <circle r={12} fill="none" stroke="#f97316" strokeWidth={2} className="beacon-pulse" />
          <circle r={4} fill="#f97316" />
          <text
            textAnchor="end"
            x={-12}
            y={4}
            style={{ 
                fontFamily: "var(--font-main)", 
                fill: "#f97316", 
                fontSize: 16, 
                fontWeight: "800",
                letterSpacing: "1px",
                textShadow: "0px 0px 8px rgba(0,0,0,1)"
            }}
          >
            {location.city}
          </text>
        </Marker>
        
      </ComposableMap>
    </div>
  );
}
