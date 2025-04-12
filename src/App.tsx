import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import { producers } from './components/mockData';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const stored = localStorage.getItem('smaknara_cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('smaknara_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans relative">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌿 Smaknara</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/checkout', { state: { cart: cartItems } })} className="underline text-sm">
            Checkout
          </button>
          <button onClick={() => setShowCart(true)} className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
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
              <div key={product.id} className="bg-background rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-primary">{product.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">From {p.name}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.tags.map((tag: string, i: number) => (
                      <span key={i} className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-bold text-md">{product.price} kr</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-primary hover:bg-hover text-white py-2 px-4 rounded-md transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6 mt-10 border-t">
        © 2025 Smaknara. Supporting local, one bite at a time.
      </footer>

      {/* Cart Sidebar */}
      {showCart && <Cart items={cartItems} onClose={() => setShowCart(false)} />}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  </Router>
);

export default App;
