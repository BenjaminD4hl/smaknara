// src/pages/ProducerProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Producer {
  name: string;
  location: string;
  profileImage?: string;
}

const ProducerProfile: React.FC = () => {
  const { producerId } = useParams();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducer = async () => {
      if (!producerId) return;

      try {
        const producerRef = doc(db, 'producers', producerId);
        const docSnap = await getDoc(producerRef);
        if (docSnap.exists()) {
          setProducer(docSnap.data() as Producer);
        }
      } catch (error) {
        console.error('Error fetching producer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducer();
  }, [producerId]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!producer) {
    return <div className="text-center p-4">Producer not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{producer.name}</h1>
      {producer.profileImage ? (
        <img
          src={producer.profileImage}
          alt={`${producer.name}'s profile`}
          className="w-40 h-40 object-cover rounded-full mb-4"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          No Image
        </div>
      )}
      <p className="mb-4">Location: {producer.location}</p>
      {/* You can extend this with product listings, reviews, etc. */}
    </div>
  );
};

export default ProducerProfile;
