import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { producers } from './mockData';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;

    document.head.appendChild(script);
    window.initMap = () => resolve();
  });
};

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMaps(apiKey);

        if (!mapRef.current || !window.google) return;

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 59.3, lng: 18.0 },
          zoom: 11,
        });

        producers.forEach((producer, index) => {
          const marker = new window.google.maps.Marker({
            position: { lat: producer.lat, lng: producer.lng },
            map,
            title: producer.name,
          });

          // Animate marker drop using setTimeout + framer motion-like bounce
          setTimeout(() => {
            marker.setAnimation(window.google.maps.Animation.DROP);
          }, index * 200);
        });

        setLoaded(true);
        console.log('✅ Google Maps loaded');
      } catch (error) {
        console.error('❌ Failed to load Google Maps', error);
      }
    };

    initMap();
  }, [apiKey]);

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
