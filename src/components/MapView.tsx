import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { producers } from './mockData';

declare global {
  interface Window {
    google: any;
  }
}

const loadGoogleMaps = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;

    document.head.appendChild(script);
  });
};

interface MapViewProps {
  filterEmoji?: string;
}

const MapView: React.FC<MapViewProps> = ({ filterEmoji }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const mapInstance = useRef<any>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMaps(apiKey);
        if (!mapRef.current || !window.google) return;

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 59.3, lng: 18.0 },
          zoom: 11,
          mapId: 'd72f842e2d05a0f8',
        });

        mapInstance.current = map;

        producers.forEach((producer) => {
          if (filterEmoji && !producer.emoji.includes(filterEmoji)) return;

          const markerElement = document.createElement('div');
          markerElement.innerHTML = `<span style="font-size: 1.5rem;">${producer.emoji}</span>`;

          new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: producer.lat, lng: producer.lng },
            content: markerElement,
            title: producer.name,
          });
        });

        window.addEventListener('panToLocation', (e: any) => {
          const { lat, lng } = e.detail;
          if (mapInstance.current) {
            mapInstance.current.panTo({ lat, lng });
            mapInstance.current.setZoom(14);
          }
        });

        setLoaded(true);
        console.log('✅ Google Maps initialized with AdvancedMarkerElement');
      } catch (err) {
        console.error('❌ Error initializing Google Maps:', err);
      }
    };

    initMap();
  }, [apiKey, filterEmoji]);

  return (
    <motion.div
      ref={mapRef}
      className="w-full h-[300px] sm:h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    />
  );
};

export default MapView;

