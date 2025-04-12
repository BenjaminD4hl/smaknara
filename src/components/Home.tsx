import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import MapView from './MapView';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dietFilter, setDietFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
      <div className="w-full h-[300px] sm:h-[400px]">
        <MapView />
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">🛒 Explore Local Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="🔍 Search by name or category"
            className="p-2 border rounded w-full"
          />
          <select value={categoryFilter} onChange={handleCategoryChange} className="p-2 border rounded w-full">
            <option value="">All Categories</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={tagFilter} onChange={handleTagChange} className="p-2 border rounded w-full">
            <option value="">All Tags</option>
            {uniqueTags.map((tag, idx) => (
              <option key={idx} value={tag}>{tag}</option>
            ))}
          </select>
          <select value={dietFilter} onChange={handleDietChange} className="p-2 border rounded w-full">
            <option value="">All Diets</option>
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
            <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
