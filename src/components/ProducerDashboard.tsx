import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const ProducerDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [producerData, setProducerData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', price: '', image: '', category: '' });

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const producerDoc = await getDoc(doc(db, 'producers', currentUser.uid));
        if (producerDoc.exists()) {
          setProducerData(producerDoc.data());
        }
        const q = query(collection(db, 'products'), where('producerId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setUser(null);
        setProducerData(null);
        setProducts([]);
      }
    });
  }, []);

  const handleSignIn = () => signInWithPopup(auth, provider);
  const handleSignOut = () => signOut(auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const product = { ...formData, price: Number(formData.price), producerId: user.uid };
    const docRef = await addDoc(collection(db, 'products'), product);
    setProducts(prev => [...prev, { id: docRef.id, ...product }]);
    setFormData({ name: '', price: '', image: '', category: '' });
  };

  return (
    <div className="min-h-screen bg-white text-text p-6 font-sans max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Producer Dashboard</h1>

      {!user ? (
        <button onClick={handleSignIn} className="bg-primary text-white py-2 px-4 rounded">🔐 Sign in with Google</button>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-lg font-medium">👋 Welcome, {user.displayName}</p>
            <button onClick={handleSignOut} className="text-sm text-gray-500 underline">Sign out</button>
          </div>

          {producerData ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">{producerData.name}</h2>
                <p className="text-gray-600">{producerData.location}</p>
                <p>{producerData.description}</p>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3 mb-6">
                <input type="text" name="name" placeholder="Product Name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="number" name="price" placeholder="Price (SEK)" required value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="bg-primary text-white w-full py-2 rounded">➕ Add Product</button>
              </form>

              <h3 className="text-lg font-semibold mb-2">📦 Your Products</h3>
              <ul className="space-y-2">
                {products.map(p => (
                  <li key={p.id} className="border p-3 rounded">
                    <p className="font-bold">{p.name} – {p.price} kr</p>
                    <p className="text-sm text-gray-500">{p.category}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-red-600">❗You are not yet registered as a producer.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProducerDashboard;
