import {  useState } from "react";
import baseInstance from "../config/baseInstance";


const useDisplayTableId = (url) => {
const [recipeId, setRecipeId] = useState(null);
    
    const getRecipeId = async (id) => {
      try {
       const { data } = await baseInstance.get(`${url}/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
       );
       
        setRecipeId(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { recipeId,getRecipeId  };
}

export default useDisplayTableId