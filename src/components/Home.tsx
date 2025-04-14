// src/components/Home.tsx (or src/pages/Home.tsx, depending on your structure)
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      {/* HERO SECTION */}
      {/* Add top padding so content isn’t hidden behind the fixed nav */}
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/hero1.jpg")',
          }}
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Välkommen till Smaknara
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Upptäck färska, hållbara produkter från lokala producenter nära dig.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/browse"
              className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 transition-colors"
            >
              Handla Nu
            </a>
            <a
              href="/register-producer"
              className="px-6 py-3 bg-white text-green-600 rounded hover:bg-gray-200 transition-colors"
            >
              Bli Producent
            </a>
          </div>
        </div>
      </div>

      {/* INFO SECTION: "Vad är Smaknara?" / "Så fungerar det?" */}
      <section className="bg-white py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Vad är Smaknara?</h2>
          <p className="text-lg mb-8">
            Smaknara är en digital mötesplats för dig som värdesätter lokala och
            hållbara livsmedel. Genom att koppla samman konsumenter och
            småskaliga producenter direkt, vill vi göra det enklare att hitta
            och köpa färska, närproducerade råvaror.
          </p>

          <h2 className="text-3xl font-bold mb-4">Så fungerar det</h2>
          <p className="text-lg mb-4">
            Utforska vår karta för att se utbudet nära dig,
            eller sök efter specifika produkter. När du hittar något du gillar
            kan du läsa mer om producenten, se recensioner och lägga en
            beställning direkt via vår plattform.
          </p>
          <p className="text-lg">
            Är du producent själv? Registrera dig och lägg upp dina produkter
            så att fler kan upptäcka och handla från just din gård eller
            verksamhet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
