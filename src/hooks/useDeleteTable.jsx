import { useState } from "react";
import baseInstance from "../config/baseInstance";

const useDeleteTable = (url) => {
  const [recipeDelete, setRecipeDelete] = useState(null);

  const RecipeDelete = async (id) => {
    try {
      const { data } = await baseInstance.delete(`${url}/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRecipeDelete(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { recipeDelete, RecipeDelete };
};

export default useDeleteTable;
