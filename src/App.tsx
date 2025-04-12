import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Checkout from './components/Checkout';
import ProducerRegister from './components/ProducerRegister';
import ProducerProfile from './components/ProducerProfile';
import ProducerDashboard from './components/ProducerDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/register-producer" element={<ProducerRegister />} />
      <Route path="/producers/:producerId" element={<ProducerProfile />} />
      <Route path="/dashboard" element={<ProducerDashboard />} />
    </Routes>
  );
};

export default App;
