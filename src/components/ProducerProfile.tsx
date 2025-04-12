import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProducerProfile: React.FC = () => {
  const { producerId } = useParams();
  const [producer, setProducer] = useState<any>(null);

  useEffect(() => {
    const fetchProducer = async () => {
      if (!producerId) return;
      try {
        const docRef = doc(db, 'producers', producerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducer(docSnap.data());
        } else {
          setProducer(null);
        }
      } catch (err) {
        console.error('Error fetching producer:', err);
        setProducer(null);
      }
    };
    fetchProducer();
  }, [producerId]);

  if (producer === null) {
    return (
      <div className="min-h-screen p-6 text-center text-gray-600">
        <p>❌ Producer not found or loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-text font-sans p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">{producer.name}</h1>
      <p className="text-gray-600 text-sm mb-2">📍 {producer.location}</p>
      <p className="text-md mb-6">{producer.description}</p>
      <div className="text-sm text-gray-500">✨ More features coming soon (products, reviews...)</div>
    </div>
  );
};

export default ProducerProfile;
