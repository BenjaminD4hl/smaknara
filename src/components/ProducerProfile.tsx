import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const ProducerProfile: React.FC = () => {
  const { producerId } = useParams();
  const [producer, setProducer] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducerAndProducts = async () => {
      if (!producerId) return;

      try {
        const docRef = doc(db, 'producers', producerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducer(docSnap.data());

          const q = query(collection(db, 'products'), where('producerId', '==', producerId));
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(productList);
        } else {
          setProducer(null);
        }
      } catch (err) {
        console.error('Error fetching producer and products:', err);
        setProducer(null);
      }
    };

    fetchProducerAndProducts();
  }, [producerId]);

  if (producer === null) {
    return (
      <div className="min-h-screen p-6 text-center text-gray-600">
        <p>❌ Producer not found or loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-text font-sans p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">{producer.name}</h1>
      <p className="text-gray-600 text-sm mb-2">📍 {producer.location}</p>
      <p className="text-md mb-6">{producer.description}</p>

      <h2 className="text-2xl font-semibold mb-4">🛍 Products</h2>
      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-md font-semibold mt-1">{product.price} kr</p>
              {product.image && <img src={product.image} alt={product.name} className="w-full h-32 object-cover mt-2 rounded" />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products listed yet.</p>
      )}
    </div>
  );
};

export default ProducerProfile;
