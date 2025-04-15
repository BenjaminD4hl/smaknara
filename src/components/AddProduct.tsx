import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const AddProduct: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        image,
        emoji,
        producerId: currentUser.uid,
        createdAt: new Date(),
      });

      setName('');
      setPrice('');
      setImage('');
      setEmoji('');
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lägg till produkt</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Produktnamn" value={name} onChange={e => setName(e.target.value)} required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Pris (kr)" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Bild-URL" value={image} onChange={e => setImage(e.target.value)} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Emoji (ex 🥕)" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Lägg till</button>
      </form>
    </div>
  );
};

export default AddProduct;
