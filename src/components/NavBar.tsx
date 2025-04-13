import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Home as HomeIcon, User, Store } from 'lucide-react';

const NavBar: React.FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 hover:bg-green-100 rounded-md ${isActive ? 'bg-green-200 font-semibold' : ''}`;

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex justify-center gap-4">
      <NavLink to="/" className={linkClasses}>
        <HomeIcon size={20} /> Home
      </NavLink>
      <NavLink to="/checkout" className={linkClasses}>
        <ShoppingCart size={20} /> Cart
      </NavLink>
      <NavLink to="/register-producer" className={linkClasses}>
        <Store size={20} /> Sell
      </NavLink>
      <NavLink to="/profile" className={linkClasses}>
        <User size={20} /> Profile
      </NavLink>
    </nav>
  );
};

export default NavBar;