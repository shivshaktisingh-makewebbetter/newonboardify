// ProtectedRoute.js
import { useEffect } from 'react';

import { getRole } from '../utils/helper';

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getRole();


 useEffect(()=>{
//   if (role === null){
//     navigate('/');
//    }
//    if(role === 'customer' && !allowedRoles.includes(role)){
//     navigate('/user');
//    }

//    if(role === 'admin' && !allowedRoles.includes(role)){
//     navigate('/admin');
//    }

//    if(role === 'superAdmin' && !allowedRoles.includes(role)){
//     navigate('/admin');
//    }
 } ,[role])

  return element;
};

