import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);



  const handleLogout=()=>{
    localStorage.removeItem("token");
    setUserData(null);
    toast.success("Logged out successfully!");
   
  }






  return (
    <AuthContext.Provider value={{ userData, saveUserData, setUserData,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
