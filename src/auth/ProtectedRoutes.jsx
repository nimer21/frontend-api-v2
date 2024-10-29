import React, { Children } from 'react'
import {Navigate} from 'react-router-dom';

export default function ProtectedRoutes({ children}) {
  const token = sessionStorage.getItem("authTokenJWT");
    if (!token) {
      //navigate('/Login');
      return <Navigate to='/Login' replace/>
    }
  return children;
}
