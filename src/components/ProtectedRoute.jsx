import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  // 1. Debe estar logueado
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 2. (Opcional) Debe tener rol de 'admin' o 'editor' para entrar
  // Si no tiene rol (ej: un cliente normal que se logueó), lo sacamos
  if (userRole !== 'admin' && userRole !== 'editor') {
    alert("No tienes permisos para acceder a esta área.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;