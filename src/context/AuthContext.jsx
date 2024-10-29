import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // Check token expiration and remove it if session ended
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  let sessionTimer;

  const startSessionTimer = () => {
    sessionTimer = setTimeout(() => {
      console.log('Session expired, logging out...');
      logout();
    }, sessionTimeout);
  };
  
  const resetSessionTimer = () => {
    // Clear the previous timer to avoid multiple logout calls
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
    // Start the timer again
    startSessionTimer();
  };
  
  // Ensure that you only set the listeners once
  window.addEventListener('mousemove', resetSessionTimer);
  window.addEventListener('keydown', resetSessionTimer);
  



  const login = async ({ ...data }) => {
    setErrors([]);
    try {
      const response = await axios.post("api/login", data);
      setUser(response.data.user);

      // Save the token
      //localStorage.setItem("authTokenJWT", response.data.token);
      sessionStorage.setItem("authTokenJWT", response.data.token);
      // Storing the user object in localStorage
      //localStorage.setItem("authUser", JSON.stringify(response.data.user));

      // Store user object as a string in sessionStorage
      //const user = { name: "John", email: "john@example.com" };
      sessionStorage.setItem("user", JSON.stringify(response.data.user));


      // Fetch user data after login
      toast.success("تم تسجيل الدخول بنجاح"); //
      startSessionTimer();
      navigate("/");
    } catch (error) {
      console.error(error);
      console.error("error===>",error.message);
      if(error.message=="Network Error"){
        setErrors(["خطأ في الاتصال بالسيرفر"]);
        toast.error("تأكد من الاتصال بالإنترنت"); //
      }
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      if (error.response.status === 401) {
        setErrors(error.response.data.message);
        //console.log("error.response.message", error.response); //
        /**
         * {data: {…}, status: 401, statusText: '', headers: AxiosHeaders, config: {…}, …}
         * data: {message: 'Bad creds'}
         * status: 401
         */
      }
    }
  };

  const register = async ({ ...data }) => {
    setErrors([]);
    try {
      const response = await axios.post("api/register", data);

      toast.success("تم إنشاء حسابك بنجاح"); //
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const logout = async () => {
    try {
      const token = sessionStorage.getItem("authTokenJWT");

      const responseLogout = await axios.post(
        "api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(null);
      sessionStorage.removeItem("authTokenJWT");
      //localStorage.removeItem("authUser");

      // Remove a specific item from sessionStorage
      sessionStorage.removeItem("user");

      // Clear all data from sessionStorage
      sessionStorage.clear();

      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/login");
    } catch (error) {
      console.log("catch error:=> ", error);
      if (error.response.status === 401) {
        sessionStorage.removeItem("authTokenJWT");
      sessionStorage.removeItem("user");
      sessionStorage.clear();
      navigate("/login");        
      }
    }
  };

  useEffect(() => {
   
    if (!user) {
      // Retrieve, modify, and update user in localStorage
      //const storedUser = JSON.parse(localStorage.getItem("authUser"));
      
      // Retrieve the user object from sessionStorage
        const storedUser = JSON.parse(sessionStorage.getItem("user"));

      if (storedUser) {
        //console.log(storedUser); // Access user properties
        setUser(storedUser);
      } else {
        //console.log('No user found in localStorage');
      }

      //getUser();
      //setUser();
      //setUser(localStorage.getItem('authUser'));
      //setUser(JSON.parse(localStorage.getItem("authUser") || "[]"));
      //console.log("getUser()=>", user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, errors, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
