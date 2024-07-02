import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Mycontext } from './SignUp';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, adminData } = useContext(Mycontext);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!isLoggedIn || !currentUser || currentUser.name !== adminData.adminName || currentUser.email !== adminData.adminEmail) {
    return <Navigate to="/home"/>;
  }

  return children;
};

export default ProtectedRoute;
