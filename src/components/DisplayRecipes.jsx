import { FaMoneyBill1, FaRegFileLines, FaRegTrashCan, FaTags } from "react-icons/fa6";
import Image from "../assets/no-data.png";
import useDisplayTable from "../hooks/useDisplayTable";
import useSearchTerm from "../hooks/useSearchTerm ";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import NoData from "./NoData";
import SearchInput from "./SearchInput";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Tags from "./Tags";
import Categroies from "./Category";
import useDisplayTableId from "../hooks/useDisplayTableId";
import Modals from "../shared/Modal"; 
import useModals from "../hooks/useModals"; 
import { SlCalender } from "react-icons/sl";
import useDeleteTable from "../hooks/useDeleteTable";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const imgUrl = "https://upskilling-egypt.com:3006/";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import baseInstance from "../config/baseInstance";
import toast from "react-hot-toast";
import Paginate from "./Paginate";
import Loader from "./Loader";

const DisplayRecipes = () => {
  const {searchTerm, handleSearch}= useSearchTerm();
  // const { usersList,getCurrentUsers } = useDisplayTable("Recipe",searchTerm);
  const { getRecipeId,recipeId } = useDisplayTableId("Recipe");
  const { RecipeDelete} =  useDeleteTable("Recipe");
  const { show, handleClose,handleShow } = useModals();
  const [modalType, setModalType] = useState('');
  const {userData}= useContext(AuthContext);
  const navigate=useNavigate();
  const [favoutrite, setFavoutrite] = useState([]);


  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5); // ثابت للـ page size
  
  const { usersList,getCurrentUsers,totalNumberOfPages,loading  } = useDisplayTable("Recipe",
    searchTerm, pageNumber, pageSize);


  
  const handlePageClick = (data) => {
    setPageNumber(data.selected + 1); // نستخدم selected + 1 عشان react-paginate بيبدأ العد من 0
  };

  const addToFavorite = async (recipeId) => {
    try {
      const {data} = await baseInstance.post("userRecipe",{"recipeId":recipeId},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
       
      setFavoutrite(data)

      toast.success("Recipe Added Successfully");
      handleClose();
      navigate("/dashboard/favorites");
    } catch (error) {
      console.log(error);
    }
  };


  const openModal = (id) => {
    handleShow();
    getRecipeId(id)
    setModalType('view');
  }
  

  const handleDelete = (id) => {
    setModalType('delete');
    handleShow(); 
    getRecipeId(id); 
  };

  const deleteitem = async () => {
    await RecipeDelete(recipeId.id); 
    handleClose(); 
    getCurrentUsers(); 
  };





  return (
    <div className="container">

    
   

      <div className="row align-items-center gy-3">
        <div className="col-md-6">
        <SearchInput 
            searchTerm={searchTerm.name} 
            handleSearch={handleSearch} 
            placeholder={"Search By Recipe Name"} 
            name="name"
          />
      </div>

      <div className="col-md-3">
         <Categroies handleSearch={handleSearch} searchTerm={searchTerm}/>
      </div>

      <div className="col-md-3">
         <Tags handleSearch={handleSearch}/>
      </div>
      </div>

      {loading ? <div className="text-center my-5">
        <Loader />
      </div> :
        <div className="table-responsive">
        <table className="table table-hover table-responsive text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>tag</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ?
            usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  {user.imagePath ? (
                    <img
                      src={`${imgUrl}/${user?.imagePath}`}
                      alt={user.userName}
                      className="user-img"
                    />
                  ) : (
                    <img src={Image} alt="logo"  className="user-img" />
                  )}
                </td>
                <td>{user.price}</td>
                <td>{user.description}</td>
                <td>{user.tag.name}</td>
                <td>{user.category[0].name} </td>
                <td>     
                  <div className="dropdown">
               <button  className=" dropdown-toggle btn btn-success" type="button" data-bs-toggle="dropdown" >
                  <HiDotsHorizontal />
               </button>
                 <ul  className="dropdown-menu ">
                    {userData?.userGroup==="SuperAdmin"?
                    <>
                  <li className="drop-link" onClick={() => openModal(user.id)}>
                  <IoEye className=" text-success" />
                  <span>View</span>
                  </li>

                  <li className=" drop-link" onClick={() => handleDelete(user.id)} >
                <FaRegTrashCan className=" text-danger"  />
                <span>Delete</span>
                  </li>

                <Link to={`/dashboard/edit-recipe/${user.id}`} className=" text-dark" >
                <li className=" drop-link">
                 <FaEdit className=" text-warning" />
                <span>Edit</span>
                </li>
                </Link>
                    </>
                  : 
                  <>
                   <li className="drop-link" onClick={() => openModal(user.id)}>
                  <IoEye className=" text-success" />
                  <span>View</span>
                  </li>

                  <li className="drop-link" onClick={() => addToFavorite(user.id)}>
                  <FaHeart className=" text-success" /> 
                  <span className="favoutrite" >Add to Favorites</span>
                  </li>
                  </>

                    }
                 
              
                </ul>
                   </div>
                </td>
              </tr>
            ))
            :  <tr>
          <td colSpan="7">
                <NoData />
             </td>
             </tr>
            }
        </tbody>
       </table>
        </div>
       
       }
      



      <Modals show={show} handleClose={handleClose}>
        {modalType === 'view' && recipeId ? (
          <div>
            <h4>{recipeId.name}</h4>
            <div className="text-center my-5">
              {recipeId.imagePath ? 
                <img src={`${imgUrl}/${recipeId?.imagePath}`} alt={recipeId.name} className="recipe-details" />
                : <img src={Image} alt="logo" className="user-img-list" />
              }
            </div>
            <p className="text-success"><FaRegFileLines size={20} className="me-2"/> 
              Description: <span className="text-dark">{recipeId.description}</span>
            </p>
            <p className="text-success"><SlCalender size={20} className="me-2"/> 
              Category: <span className="text-dark">{recipeId.category[0].name}</span>
            </p>
            <p className="text-success"><FaTags size={20} className="me-2"/> 
              Tag: <span className="text-dark">{recipeId.tag.name}</span>
            </p>
            <p className="text-success"><FaMoneyBill1 size={20} className="me-2"/> 
              Price: <span className="text-dark">{recipeId.price} EGP</span>
            </p>
          </div>
        ) : modalType === 'delete'&& recipeId ?  (
          <div className=" text-center">
            <h4>Delete Recipe</h4>
              <div className="text-center my-5 ">
             <img src={Image} alt="logo"  className="recipe-delete" />
              </div>
           <h4>Delete This Recipe ?</h4>
           <p className=" text-secondary">are you sure you want to delete this item ? if you are sure just click on delete it</p>
           <div className=" text-end">
           <button className=" btn btn-outline-danger" onClick={deleteitem}>Delete this item</button>
           </div>
          </div>
        ) :( <Loader />)
         }
      </Modals>


         {usersList.length>0 &&
          <Paginate handlePageClick={handlePageClick} totalNumberOfPages={totalNumberOfPages}  />
         }
     




    </div>
  );
};

export default DisplayRecipes;







