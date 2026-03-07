"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Search, Plus, Minus, Maximize } from 'lucide-react';

export default function GoogleMapEmbed() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordinates for 45 Av Allal Ben Abdellah, Larache
  const lat = 35.1932;
  const lng = -6.1534;

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically load Leaflet and its CSS from CDN to avoid build-time dependencies
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (!window.L || !mapContainerRef.current) return;

      const L = window.L;
      // Initialize map with vibrant colored tiles (OpenStreetMap)
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 16,
        zoomControl: false, // Custom controls instead
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom Red GPS-style marker
      const customIcon = L.divIcon({
        className: 'custom-gps-icon',
        html: `
          <div class="relative flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-2xl">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48]
      });

      L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Store map instance for custom button actions
      (window as any).mapInstance = map;
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [lat, lng]);

  const handleZoomIn = () => (window as any).mapInstance?.zoomIn();
  const handleZoomOut = () => (window as any).mapInstance?.zoomOut();
  const handleCenter = () => (window as any).mapInstance?.setView([lat, lng], 16);

  return (
    <div className="relative w-full h-[450px] md:h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 bg-[#f8f9fa] group">
      <div ref={mapContainerRef} className="w-full h-full z-0 pointer-events-auto" />

      {/* Airbnb-style UI Overlay */}
      {mapLoaded && (
        <>
          {/* Top Left: Search Icon Container */}
          <div className="absolute top-6 left-6 z-[1000]">
            <div className="bg-white hover:bg-neutral-50 p-3 rounded-full shadow-lg border border-neutral-200 transition-all hover:scale-105 cursor-pointer flex items-center justify-center">
              <Search className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
            </div>
          </div>

          {/* Right Center: Zoom and Settings Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col">
              <button
                onClick={handleZoomIn}
                className="p-3.5 hover:bg-neutral-50 transition-colors border-b border-neutral-100 flex items-center justify-center group/btn"
              >
                <Plus className="w-5 h-5 text-neutral-800 transition-transform group-hover/btn:scale-110" strokeWidth={2.5} />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-3.5 hover:bg-neutral-50 transition-colors flex items-center justify-center group/btn"
              >
                <Minus className="w-5 h-5 text-neutral-800 transition-transform group-hover/btn:scale-110" strokeWidth={2.5} />
              </button>
            </div>

            <button
              onClick={handleCenter}
              className="bg-white p-3.5 rounded-2xl shadow-xl border border-neutral-200 hover:bg-neutral-50 transition-all flex items-center justify-center group/btn"
            >
              <Maximize className="w-5 h-5 text-neutral-800 transition-transform group-hover/btn:scale-110" strokeWidth={2.2} />
            </button>

            <div className="bg-white p-3.5 rounded-2xl shadow-xl border border-neutral-200 hover:bg-neutral-50 transition-all flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-primary/40 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(79,147,203,0.5)]" />
              </div>
            </div>
          </div>

          {/* Bottom Right Attribution Hide */}
          <style jsx global>{`
            .leaflet-control-attribution { display: none !important; }
            .custom-gps-icon { background: none !important; border: none !important; }
          `}</style>
        </>
      )}

      {/* Loading State Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-[1001] bg-white flex flex-col items-center justify-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Chargement du plan...</span>
        </div>
      )}
    </div>
  );
}

declare global { interface Window { L: any; } }
