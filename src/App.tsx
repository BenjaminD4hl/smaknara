import React from 'react';
import MapView from './components/MapView';
import ProductListing from './components/ProductListing';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Smaknara</h1>
      <MapView />
      <ProductListing />
    </div>
  );
};

export default App;
