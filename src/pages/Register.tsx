import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/register-producer');
    } catch (err) {
      setError('Kunde inte skapa konto. Prova igen.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Skapa konto</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="email" required placeholder="E-post" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <input type="password" required placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Registrera</button>
      </form>
    </div>
  );
};

export default Register;
