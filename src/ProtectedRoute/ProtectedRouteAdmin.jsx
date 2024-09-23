import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Mycontext } from '../Router/RouterApp';

const AdminProtectedRoute = ({ children}) => {
  const { isLoggedIn, currentUser } = useContext(Mycontext);

  if (isLoggedIn===false) {
    return <Navigate to="/login" />;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/home" />;
  }

  return children;
};


export default AdminProtectedRoute;
