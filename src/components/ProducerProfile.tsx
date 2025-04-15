import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

interface Producer {
  name: string;
  location: string;
  profileImage?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
  producerId: string;
}

const ProducerProfile: React.FC = () => {
  const { producerId } = useParams();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducer = async () => {
      if (!producerId) return;
      try {
        const producerRef = doc(db, 'producers', producerId);
        const docSnap = await getDoc(producerRef);
        if (docSnap.exists()) {
          setProducer(docSnap.data() as Producer);
        }
      } catch (error) {
        console.error('Error fetching producer:', error);
      }
    };

    const fetchProducts = async () => {
      if (!producerId) return;
      try {
        const q = query(
          collection(db, 'products'),
          where('producerId', '==', producerId)
        );
        const querySnap = await getDocs(q);
        const productList: Product[] = [];
        querySnap.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducer();
    fetchProducts();
    setLoading(false);
  }, [producerId]);

  const handleDelete = async (productId: string) => {
    if (confirm('Är du säker på att du vill ta bort produkten?')) {
      await deleteDoc(doc(db, 'products', productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  if (loading) return <div className="text-center p-4">Laddar...</div>;

  if (!producer)
    return <div className="text-center p-4">Producenten hittades inte.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{producer.name}</h1>

      {producer.profileImage ? (
        <img
          src={producer.profileImage}
          alt={`${producer.name}'s profile`}
          className="w-40 h-40 object-cover rounded-full mb-4"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          No Image
        </div>
      )}

      <p className="mb-4">Plats: {producer.location}</p>

      <div className="flex gap-4 mb-6">
        <a
          href={`/edit-producer/${producerId}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          ✏️ Redigera profil
        </a>
        <a
          href="/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          ➕ Lägg till ny produkt
        </a>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">🧺 Mina produkter</h2>

      {products.length === 0 ? (
        <p className="text-gray-600">Inga produkter tillagda än.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">
                {product.emoji} {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.price} kr</p>

              <div className="flex justify-between mt-3">
                <a
                  href={`/edit-product/${product.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Redigera
                </a>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProducerProfile;
