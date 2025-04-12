import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-white text-text font-sans p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">🛒 Explore Local Products</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="🔍 Search by name or category"
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-md font-semibold mt-1">{product.price} kr</p>
            {product.image && <img src={product.image} alt={product.name} className="w-full h-32 object-cover mt-2 rounded" />}
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
