import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const ProducerRegister: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      console.error("Sign-in error:", err);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await setDoc(doc(db, 'producers', user.uid), {
        ...formData,
        createdBy: user.uid,
        email: user.email
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error saving producer:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto text-text font-sans">
      <h1 className="text-2xl font-bold mb-4 text-primary">Register Your Producer Profile</h1>

      {!user ? (
        <button onClick={handleSignIn} className="bg-primary text-white py-2 px-4 rounded">
          🔐 Sign in with Google
        </button>
      ) : success ? (
        <p className="text-green-600">✅ Registered! You can now visit your dashboard.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Producer Name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="location" placeholder="Location" required value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Short Description" required value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-24" />
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded w-full">📬 Register Producer</button>
        </form>
      )}
    </div>
  );
};

export default ProducerRegister;
