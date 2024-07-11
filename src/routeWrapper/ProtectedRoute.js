// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/authUtils';

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = getUser();

  // if (!user) {
  //   // If user is not logged in, redirect to the login page
  //   return <Navigate to="/" />;
  // }

  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   // If user does not have the required role, redirect based on the user's role
  //   const redirectPath = user.role === 'admin' ? '/admin' : '/user';
  //   return <Navigate to={redirectPath} />;
  // }

  return element;
};

