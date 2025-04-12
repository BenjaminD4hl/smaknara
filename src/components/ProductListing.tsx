import React from 'react';
import { producers } from './mockData';

const ProductListing = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Available Products</h2>
      {producers.map((producer) => (
        <div key={producer.id} style={{ marginBottom: 20 }}>
          <h3>{producer.name}</h3>
          <ul>
            {producer.products.map((product) => (
              <li key={product.id}>
                {product.name} — {product.price} kr
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
