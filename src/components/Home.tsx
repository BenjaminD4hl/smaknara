import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import MapView from './MapView';
import mockProducts from './mockData';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dietFilter, setDietFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      let productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (productList.length === 0) {
        productList = mockProducts;
      }

      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagFilter(e.target.value);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDietFilter(e.target.value);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchesTag = tagFilter ? (p.tags || []).includes(tagFilter) : true;
    const matchesDiet = dietFilter ? (p.diet || []).includes(dietFilter) : true;

    return matchesSearch && matchesCategory && matchesTag && matchesDiet;
  });

  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const uniqueTags = Array.from(new Set(products.flatMap(p => p.tags || [])));
  const uniqueDiets = Array.from(new Set(products.flatMap(p => p.diet || [])));

  return (
    <div className="min-h-screen bg-white text-text font-sans">
      <header className="text-center py-8 bg-primary text-white shadow">
        <h1 className="text-4xl font-extrabold tracking-tight">Smaknara</h1>
        <p className="text-md mt-2">Hitta mat nära dig – direkt från producenter</p>
      </header>

      <div className="w-full h-[300px] sm:h-[400px]">
        <MapView />
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="🔍 Sök efter produkt eller kategori"
            className="p-2 border rounded w-full"
          />
          <select value={categoryFilter} onChange={handleCategoryChange} className="p-2 border rounded w-full">
            <option value="">Alla kategorier</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={tagFilter} onChange={handleTagChange} className="p-2 border rounded w-full">
            <option value="">Alla taggar</option>
            {uniqueTags.map((tag, idx) => (
              <option key={idx} value={tag}>{tag}</option>
            ))}
          </select>
          <select value={dietFilter} onChange={handleDietChange} className="p-2 border rounded w-full">
            <option value="">Alla dieter</option>
            {uniqueDiets.map((diet, idx) => (
              <option key={idx} value={diet}>{diet}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              {product.tags && <p className="text-xs text-amber-700">🏷 {product.tags.join(', ')}</p>}
              {product.diet && <p className="text-xs text-emerald-600">🌿 {product.diet.join(', ')}</p>}
              <p className="text-md font-semibold mt-1">{product.price} kr</p>
              {product.image && <img src={product.image} alt={product.name} className="w-full h-32 object-cover mt-2 rounded" />}
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">Inga produkter matchar dina filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
