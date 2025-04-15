// src/components/NavBar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Home as HomeIcon,
  User,
  Store,
  Menu,
  LogIn,
  LogOut,
} from 'lucide-react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 hover:bg-green-100 rounded-md ${
      isActive ? 'bg-green-200 font-semibold' : ''
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-green-700">
          Smaknara
        </NavLink>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden sm:flex gap-4">
            <NavLink to="/" className={linkClasses}>
              <HomeIcon size={20} /> Hem
            </NavLink>
            <NavLink to="/browse" className={linkClasses}>
              🗺️ Karta
            </NavLink>
            <NavLink to="/checkout" className={linkClasses}>
              <ShoppingCart size={20} /> Varukorg
            </NavLink>
            <NavLink to="/register-producer" className={linkClasses}>
              <Store size={20} /> Bli producent
            </NavLink>
            {user && (
              <NavLink to="/producers/${user.uid}" className={linkClasses}>
                <User size={20} /> Min profil
              </NavLink>
            )}
          </div>

          {/* User info */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
              <span className="text-sm text-gray-700">{user.displayName || 'Användare'}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="flex items-center gap-2 text-sm text-green-700 hover:underline">
              <LogIn size={18} />
              Logga in
            </NavLink>
          )}

          {/* Hamburger menu on small screens */}
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-2 px-4 pb-3">
          <NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <HomeIcon size={20} /> Hem
          </NavLink>
          <NavLink to="/browse" className={linkClasses} onClick={() => setMenuOpen(false)}>
            🗺️ Karta
          </NavLink>
          <NavLink to="/checkout" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={20} /> Varukorg
          </NavLink>
          <NavLink to="/register-producer" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <Store size={20} /> Bli producent
          </NavLink>
          {user && (
            <NavLink
              to={`/producers/${user.uid}`}
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <User size={20} /> Min profil
            </NavLink>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-red-600"
            >
              <LogOut size={18} />
              Logga ut
            </button>
          ) : (
            <NavLink
              to="/login"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <LogIn size={18} /> Logga in
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
