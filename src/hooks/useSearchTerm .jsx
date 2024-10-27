import { useState } from "react";

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    description: "",
    price: "",
    tagId: "",
    recipeImage: "",
    categoriesIds: "",
    userName: "",  
    email: "",     
    country: "",
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
   
  };

  return { searchTerm, handleSearch };
};

export default useSearchTerm;
