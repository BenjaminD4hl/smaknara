import React, { useState } from 'react';

const ProducerRegister: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🧑‍🌾 New Producer Registered:", formData);
    setSubmitted(true);
    // Here you can connect to Firebase with addDoc(...) etc.
  };

  return (
    <div className="min-h-screen bg-background text-text p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">👩‍🌾 Become a Producer</h1>
      {submitted ? (
        <div className="text-center text-green-600 text-lg font-medium">
          ✅ Thank you! Your application has been received. We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name or Farm Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Örebro, Sweden)"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Tell us about what you produce..."
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-hover text-white py-3 rounded-md transition"
          >
            🚀 Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ProducerRegister;
