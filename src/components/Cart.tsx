import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🛍️ Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} × {item.price} kr</p>
              </div>
              <p className="font-bold">{item.price * item.quantity} kr</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-bold">Total: {total} kr</p>
        <button className="mt-4 w-full bg-primary hover:bg-hover text-white py-2 px-4 rounded-md transition">
          Checkout (soon)
        </button>
      </div>
    </div>
  );
};

export default Cart;
