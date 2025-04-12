import React, { useEffect, useRef } from 'react';
import { producers } from './mockData';

const MapView = () => {
  const mapRef = useRef(null);

  useEffect(() => {
  console.log("MapView mounted");

  if (!window.google || !mapRef.current) {
    console.warn("Google Maps not loaded or mapRef missing");
    return;
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;

    console.log("User location:", latitude, longitude); // <-- NEW LINE

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


export default MapView;
