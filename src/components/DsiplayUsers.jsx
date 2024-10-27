import { FaEarthAmericas, FaRegTrashCan } from "react-icons/fa6";
import Image from "../assets/no-data.png";
import useDisplayTable from "../hooks/useDisplayTable";
import NoData from "./NoData";
import useSearchTerm from "../hooks/useSearchTerm ";
import SearchInput from "./SearchInput";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { FaAddressCard, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import useDisplayTableId from "../hooks/useDisplayTableId";
import useModals from "../hooks/useModals";
import useDeleteTable from "../hooks/useDeleteTable";

import Modals from "../shared/Modal";
import { MdAttachEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import Paginate from "./Paginate";
import Loader from "./Loader";
const imgUrl = "https://upskilling-egypt.com:3006/";

const DsiplayUsers = () => {
  const {searchTerm, handleSearch}= useSearchTerm();
  // const { usersList,getCurrentUsers } = useDisplayTable("Users", searchTerm);
  const { show, handleClose,handleShow } = useModals();
  const { getRecipeId,recipeId } = useDisplayTableId("Users");
  const { RecipeDelete} =  useDeleteTable("Users");
  const [modalType, setModalType] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5); // ثابت للـ page size
  
  const { usersList,getCurrentUsers,totalNumberOfPages,loading  } = useDisplayTable("Users",searchTerm, pageNumber, pageSize);


  const handlePageClick = (data) => {
    setPageNumber(data.selected + 1); // نستخدم selected + 1 عشان react-paginate بيبدأ العد من 0
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
    <div className=" mx-md-5">

      <div className="row align-items-center">
      <div className="col-md-3">
          <SearchInput 
            searchTerm={searchTerm.userName} 
            handleSearch={handleSearch} 
            placeholder={"Search By User Name"} 
            name="userName"
          />
        </div>
        <div className="col-md-3">
          <SearchInput 
            searchTerm={searchTerm.email} 
            handleSearch={handleSearch} 
            placeholder={"Search By Email"} 
            name="email"
          />
        </div>
        <div className="col-md-3">
          <SearchInput 
            searchTerm={searchTerm.country} 
            handleSearch={handleSearch} 
            placeholder={"Search By Country"} 
            name="country"
          />
        </div>
        <div className="col-md-3">  
        <select className=" form-select" onChange={handleSearch} name="group">
         <option value="">Role</option>
         <option value="1">Admin</option>
         <option value="2">User</option>
         </select>
        </div>
      </div>



      {loading ? <div className="text-center my-5">
        <Loader />
      </div>   
    :  
    <div className="table-responsive">
       <table className="table table-hover table-responsive text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Group</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ?
            usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>
                  {user.imagePath ? (
                    <img
                      src={`${imgUrl}/${user?.imagePath}`}
                      alt={user.userName}
                      className="user-img"
                    />
                  ) : (
                    <img src={Image} alt={user.userName} className="user-img" />
                  )}
                </td>
                <td >{user.email}</td>
                <td>{user.group.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>
                <td>     
                  <div className="dropdown">
               <button  className=" dropdown-toggle btn btn-success" type="button" data-bs-toggle="dropdown" >
                  <HiDotsHorizontal />
               </button>
                 <ul  className="dropdown-menu ">
                  <li className="drop-link" onClick={() => openModal(user.id)}>
                  <IoEye className=" text-success"/>
                  <span>View</span>
                  </li>
                <li className=" drop-link" onClick={() => handleDelete(user.id)}>
                <FaRegTrashCan className=" text-danger" />
                <span>Delete</span>
                </li>
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
            <p className=" text-success">
            <FaUserCircle/>user Name : 
             {" "}<span className=" text-dark">{recipeId.userName}</span>
            </p>
            <div className="text-center my-5">
              {recipeId.imagePath ? 
                <img src={`${imgUrl}/${recipeId?.imagePath}`} alt={recipeId.name} className="recipe-details" />
                : <img src={Image} alt="logo" className="user-img-list" />
              }
            </div>
            <p className="text-success"><MdAttachEmail size={20} className="me-2"/> 
              Email: <span className="text-dark">{recipeId.email}</span>
            </p>
            <p className="text-success"><IoMdPhonePortrait size={20} className="me-2"/> 
            phone Number:: <span className="text-dark">{recipeId.phoneNumber}</span>
            </p>
            <p className="text-success"><FaEarthAmericas size={20} className="me-2"/> 
            Country: <span className="text-dark">{recipeId.country}</span>
            </p>
            <p className="text-success"><FaAddressCard size={20} className="me-2"/> 
            User Type: <span className="text-dark">{recipeId.group.name}</span>
            </p>
            <p className="text-success"><SlCalender size={20} className="me-2"/> 
            Creation Date: <span className="text-dark">
            {new Date(recipeId.creationDate).toLocaleString('en-US')}
            </span>
            </p>
          </div>
          
        ) : modalType === 'delete'&& recipeId ?  (
          <div className=" text-center">
              <div className="text-center my-5 ">
             <img src={Image} alt="logo"  className="recipe-delete" />
              </div>
           <h4>Delete This Category</h4>
           <p className=" text-secondary">are you sure you want to delete this item ? if you are sure just click on delete it</p>
           <div className=" text-end">
           <button className=" btn btn-outline-danger" onClick={deleteitem}>Delete</button>
           </div>
          </div>
        ):
         (
          <div className="text-center my-5">
          <Loader />
          </div>
        )}
      </Modals>



      {usersList.length>0 &&
        <Paginate handlePageClick={handlePageClick} totalNumberOfPages={totalNumberOfPages} />
         }




    </div>
  );
};

export default DsiplayUsers;
