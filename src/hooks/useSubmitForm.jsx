import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import baseInstance from "../config/baseInstance";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
 
const useSubmitForm = (url, isLogin, redirectPath) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { saveUserData } = useContext(AuthContext);



  const submitForm = async (data) => {
    setLoading(true);
    try {
      const response = await baseInstance.post(url, data);
      if (isLogin) {
        toast.success("Login Successfully");
        
        localStorage.setItem("token", response.data.token);
        saveUserData();
      } else {
        toast.success(response.data.message);
      }
      navigate(redirectPath);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    
  };

  return {submitForm, loading,setLoading};
};

export default useSubmitForm;
