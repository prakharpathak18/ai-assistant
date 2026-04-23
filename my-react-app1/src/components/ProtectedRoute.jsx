import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = () => {
  const { session } = useAuth();

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
