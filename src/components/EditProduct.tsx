// src/components/EditProduct.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from '../firebase';

const EditProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [emoji, setEmoji] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const productRef = doc(db, 'products', productId);
      const snap = await getDoc(productRef);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setPrice(data.price);
        setEmoji(data.emoji);
        setExistingImageUrl(data.image);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    const productRef = doc(db, 'products', productId);

    let imageUrl = existingImageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `product-images/${productId}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(productRef, {
      name,
      price,
      emoji,
      image: imageUrl,
      updatedAt: serverTimestamp(),
    });

    navigate(-1); // Gå tillbaka till förra sidan
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Redigera produkt</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Produktnamn</label>
          <input
            value={name}
