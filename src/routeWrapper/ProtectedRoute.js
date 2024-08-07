// ProtectedRoute.js
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../utils/helper';

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getRole();
  const navigate = useNavigate();

 useEffect(()=>{
  if (role === null){
    navigate('/');
   }
   if((role === 'customer' || role==='admin') && !allowedRoles.includes(role)){
    navigate('/user');
   }

   if(role === 'superAdmin' && !allowedRoles.includes(role)){
    navigate('/admin');
   }
 } ,[role])

  return element;
};

