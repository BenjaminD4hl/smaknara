import React from 'react';
import MapView from './components/MapView';
import { producers } from './components/mockData';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">🌿 Smaknara</h1>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 px-6 bg-white">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Discover Local Food Near You
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Buy directly from local producers. Fresh. Sustainable. Personal.
        </p>
        <button className="bg-primary hover:bg-hover text-white px-6 py-3 rounded-md shadow-md transition">
          Browse Producers
        </button>
      </section>

      {/* Map Section */}
      <section className="py-10 px-4 bg-background">
        <h3 className="text-2xl font-bold mb-4 text-center">🌍 Nearby Producers</h3>
        <MapView />
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4 bg-white">
        <h3 className="text-2xl font-bold mb-6 text-center">🧺 Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {producers.flatMap(p =>
            p.products.map(product => (
              <div key={product.id} className="bg-background rounded-xl p-4 shadow">
                <h4 className="text-lg font-semibold text-primary">{product.name}</h4>
                <p className="text-sm text-gray-700">From {p.name}</p>
                <p className="font-bold mt-2">{product.price} kr</p>
                <button className="mt-4 w-full bg-accent hover:bg-primary text-white py-2 px-4 rounded-md transition">
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6 mt-10 border-t">
        © 2025 Smaknara. Supporting local, one bite at a time.
      </footer>
    </div>
  );
};

export default App;
