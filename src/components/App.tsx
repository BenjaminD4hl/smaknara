// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Checkout from './components/Checkout';
import ProducerRegister from './components/ProducerRegister';
import ProducerProfile from './components/ProducerProfile';
import Browse from './components/Browse';
import AddProduct from './components/AddProduct';
import EditProducer from './components/EditProducer';
import EditProduct from './components/EditProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/register-producer"
          element={
            <PrivateRoute>
              <ProducerRegister />
            </PrivateRoute>
          }
        />
        <Route path="/producers/:producerId" element={<ProducerProfile />} />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-producer/:producerId"
          element={
            <PrivateRoute>
              <EditProducer />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
