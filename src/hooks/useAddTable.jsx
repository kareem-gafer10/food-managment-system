import { useState } from "react";
import baseInstance from "../config/baseInstance";

const useAddTable = (url) => {
  const [add, setRAdd] = useState(null);

  const AddProduct = async (newCategory) => {
    try {
      const { data } = await baseInstance.post(`${url}`,newCategory,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRAdd(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { add, AddProduct };
};

export default useAddTable;
