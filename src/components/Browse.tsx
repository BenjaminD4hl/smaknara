import React, { useEffect, useRef, useState } from 'react';
import MapView from './MapView';
import { mockProducts, producers } from './mockData';

const Browse: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['🥚', '🍓', '🥕', '🧀', '🍎', '🐟', '🍒', '🥦', '🥛', '🍐', '🍣', '🥔'];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.emoji === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleViewOnMap = (lat: number, lng: number) => {
    const mapEl = document.getElementById('map');
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const event = new CustomEvent('panToLocation', { detail: { lat, lng } });
      window.dispatchEvent(event);
    }, 600);
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Browse Local Products</h1>

      <div id="map" ref={mapRef} className="mb-6">
        <MapView filterEmoji={selectedCategory} />
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{product.emoji} {product.name}</h2>
            <p className="text-sm text-gray-600 mt-1">Price: {product.price} kr</p>
            <button
              onClick={() => {
                const producer = producers.find(p => p.id === product.producerId);
                if (producer) handleViewOnMap(producer.lat, producer.lng);
              }}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              🗺️ View on Map
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;