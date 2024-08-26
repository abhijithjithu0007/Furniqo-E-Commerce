import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Mycontext } from './SignUp';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Mycontext);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!isLoggedIn || !currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
