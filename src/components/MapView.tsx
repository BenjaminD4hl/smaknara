import React, { useEffect, useRef } from 'react';
import { producers } from './mockData';

const MapView = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

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
    });
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapView;
