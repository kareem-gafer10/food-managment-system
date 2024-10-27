import { useEffect, useState } from "react";
import baseInstance from "../config/baseInstance";
import NoData from "./NoData";
const imgUrl = "https://upskilling-egypt.com:3006/";
import Image from "../assets/no-data.png";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";

const DisplayFavourite = () => {
  const [favList, setFavList] = useState([]);

  const getUserFav = async () => {
    const {data} = await baseInstance.get("userRecipe", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(data.data);

    setFavList(data.data);
  };

  const deleteFavorite = async (id) => {
    try {
      const { data } = await baseInstance.delete(`userRecipe/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(data);
      toast.error("Reciepe Deleted From Your Favorite");
      getUserFav();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFav();
  }, []);

  return (
   <div className="container py-5">
    <div className="row align-items-center text-center">
    { favList.length>0 ? 
     favList.map((item)=>(
       <div key={item.id} className="col-md-6 col-lg-4 g-5">
      
        <div className=" bg-white p-3 rounded shadow-sm position-relative">
        <FaHeart className="fav-heart text-danger" onClick={()=>deleteFavorite(item.id)}/>
       

        {item.recipe.imagePath ? 
       <img src={`${imgUrl}/${item.recipe.imagePath}`} alt={item.recipe.name} className="recipe-fav p-4" />
       : <img src={Image} alt="logo" className="recipe-fav p-4" />}

    <div>
      <p>Reciepe Name : {item.recipe.name}</p>
      <p>Reciepe Description: {item.recipe.description}</p>
   </div>
   </div>


       </div>
     ))

    : <NoData />
    }




    </div>
   </div>
  );
};








export default DisplayFavourite;



