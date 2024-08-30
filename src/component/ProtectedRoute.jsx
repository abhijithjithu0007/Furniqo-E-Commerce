import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Mycontext } from '../routing/RouterApp';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, currentUser } = useContext(Mycontext);

  if (isLoggedIn===false) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && (!currentUser || currentUser.role !== 'admin')) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
