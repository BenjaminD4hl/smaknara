// src/pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background image container */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/hero-image.jpg")',
        }}
      />
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Local Producers
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Shop fresh, sustainable products from your local community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/browse"
            className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 transition-colors"
          >
            Shop Now
          </a>
          <a
            href="/register-producer"
            className="px-6 py-3 bg-white text-green-600 rounded hover:bg-gray-200 transition-colors"
          >
            Sell With Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
