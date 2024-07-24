// ProtectedRoute.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../utils/helper';

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getRole();
  const navigate = useNavigate()

console.log(role , 'role')
//  if (!role) {
//   alert(1)
//   // If user is not logged in, redirect to the login page
//   navigate('/')
// }

  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   // If user does not have the required role, redirect based on the user's role
  //   const redirectPath = user.role === 'admin' ? '/admin' : '/user';
  //   return <Navigate to={redirectPath} />;
  // }

  return element;
};

