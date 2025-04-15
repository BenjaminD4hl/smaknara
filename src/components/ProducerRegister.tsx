// src/pages/ProducerRegister.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const categories = ['🥚', '🍓', '🥕', '🧀', '🍎', '🐟', '🥔', '🥛', '🍐'];

const ProducerRegister: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const userId = uuidv4(); // TODO: Replace with auth uid when login is active

  const handleCategoryToggle = (emoji: string) => {
    setSelectedCategories((prev) =>
      prev.includes(emoji)
        ? prev.filter((c) => c !== emoji)
        : [...prev, emoji]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const producerRef = doc(db, 'producers', userId);
      let profileImageUrl = '';

      if (imageFile) {
        const imageRef = ref(storage, `producer-images/${userId}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      await setDoc(producerRef, {
        name,
        farmName,
        location,
        contact,
        categories: selectedCategories,
        profileImage: profileImageUrl,
        createdAt: serverTimestamp(),
      });

      navigate(`/producers/${userId}`);
    } catch (error) {
      console.error('Error saving producer:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrera dig som producent</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Ditt namn</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Gård / Företagsnamn</label>
          <input
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Plats / ort</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Kontaktuppgifter</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Telefon, e-post eller båda"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Vad producerar du?</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => handleCategoryToggle(emoji)}
                className={`text-xl px-3 py-1 rounded border ${
                  selectedCategories.includes(emoji)
                    ? 'bg-green-600 text-white'
                    : 'bg-white'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Profilbild</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
        >
          Registrera producent
        </button>
      </form>
    </div>
  );
};

export default ProducerRegister;

