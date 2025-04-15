import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="p-4 text-center">Laddar...</div>;

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
