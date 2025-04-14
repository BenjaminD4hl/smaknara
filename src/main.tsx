// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// 1) Import NavBar
import NavBar from './components/NavBar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2) Render NavBar above the routes so it’s always visible */}
      <NavBar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
