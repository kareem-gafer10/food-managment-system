import { useState } from "react";
import baseInstance from "../config/baseInstance";

const useEditTable = (url) => {
  const [Edited, setEdited] = useState(null);


  const EditProduct = async (id, updatedCategory) => {
    try {
      const { data } = await baseInstance.put(`${url}/${id}`,updatedCategory,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setEdited(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { Edited, EditProduct };
};

export default useEditTable;
