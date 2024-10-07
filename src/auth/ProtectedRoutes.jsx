import React, { Children } from 'react'
import {Navigate} from 'react-router-dom';
//import Cookie from 'universal-cookie';
//import Cookies from 'js-cookie';

export default function ProtectedRoutes({ children}) {
    //const navigate = useNavigate();
    //const cookie = new Cookie();
    //const token = cookie.get('token');
    const token= true;
    //cookie.set('user21', "somecookie", { path: '/' })
    //const token = localStorage.getItem('token');
    //console.log("token",token); // token null
    //console.log("document.cookie => ",document.cookie); // token null
    //console.log("token getAll()",cookie.getAll()); // token null
    if (!token) {
      //navigate('/Login');
      return <Navigate to='/Login' replace/>
      //{()=>setShowLogin(true)}
      //return setShowLogin(true);
    }
  return children;
}
