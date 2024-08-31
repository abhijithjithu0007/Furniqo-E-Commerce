import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Mycontext } from '../routing/RouterApp';

const UserProtectedRoute = ({ children}) => {
  const { isLoggedIn, currentUser } = useContext(Mycontext);

  if (isLoggedIn===false) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default UserProtectedRoute;
