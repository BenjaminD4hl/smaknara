import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-text p-6 font-sans">
      <h1 className="text-3xl font-bold text-primary mb-6">🧾 Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <button onClick={() => navigate('/')} className="text-primary underline">Go back</button></p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item: any) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} × {item.price} kr</p>
                </div>
                <p className="font-bold">{item.price * item.quantity} kr</p>
              </li>
            ))}
          </ul>

          <p className="text-lg font-bold mb-4">Total: {total} kr</p>

          <form className="space-y-4 mb-6">
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded" />
            <textarea placeholder="Message to producer (optional)" className="w-full p-2 border rounded h-24"></textarea>
          </form>

          <button className="w-full bg-primary hover:bg-hover text-white py-3 rounded-md transition">
            🟢 Pay with Swish (Coming Soon)
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
