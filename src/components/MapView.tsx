import React, { useEffect, useRef, useState } from 'react';
import { producers } from './mockData';

const loadGoogleMaps = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        resolve();
      } else {
        reject(new Error('Google Maps failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Google Maps script failed to load'));
    document.head.appendChild(script);
  });
};

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("MapView mounted");

    loadGoogleMaps("AIzaSyCrT-ASIGi6vRLNG894y-aYFkG4DOU7Ic8")
      .then(() => {
        console.log("✅ Google Maps loaded");

        if (!mapRef.current) return;

        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("User location:", latitude, longitude);

          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 12,
          });

          producers.forEach((producer) => {
            new window.google.maps.Marker({
              position: { lat: producer.lat, lng: producer.lng },
              map,
              title: producer.name,
            });
          });

          setMapLoaded(true);
        });
      })
      .catch((err) => {
        console.error("❌ Error loading Google Maps:", err);
      });
  }, []);

  return (
    <div>
      {!mapLoaded && <p>Loading map...</p>}
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default MapView;

