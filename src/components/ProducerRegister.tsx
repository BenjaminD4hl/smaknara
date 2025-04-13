// src/pages/ProducerRegister.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Adjust import path as needed

interface ProducerRegisterProps {
  // If you need props, define them here. Otherwise, you can omit this interface.
}

const ProducerRegister: React.FC<ProducerRegisterProps> = () => {
  const navigate = useNavigate();

  // Basic state for producer info
  const [producerName, setProducerName] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Optional: if the user is logged in, you might have a user ID from auth
  const userId = 'dummy-user-id'; // Replace with real userID from Firebase Auth

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create a doc reference in Firestore for the new/updated producer
      const producerRef = doc(db, 'producers', userId);

      // 2. If an image file is chosen, upload it to Firebase Storage
      let profileImageUrl = '';
      if (imageFile) {
        const imageRef = ref(
          storage,
          `producer-images/${userId}/${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      // 3. Save the producer data in Firestore
      await setDoc(producerRef, {
        name: producerName,
        location: location,
        profileImage: profileImageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 4. Navigate user to their new profile (optional)
      navigate(`/producers/${userId}`);
    } catch (error) {
      console.error('Error registering producer:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register as a Producer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="producerName" className="block mb-1 font-medium">
            Producer Name
          </label>
          <input
            id="producerName"
            type="text"
            value={producerName}
            onChange={(e) => setProducerName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="location" className="block mb-1 font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Profile Picture
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProducerRegister;

