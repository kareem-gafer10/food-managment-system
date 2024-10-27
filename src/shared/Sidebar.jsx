import { useContext } from "react";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoLockOpenOutline } from "react-icons/io5";
import { LuTable } from "react-icons/lu";
import { MdHome } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/3.png";
import { CiHeart } from "react-icons/ci";
import Modals from "./Modal";
import ChnangePassword from "../pages/ChangePassword";
import useModals from "../hooks/useModals";


const SideBar = ({toogle}) => {

 const{ show,handleClose,handleShow}= useModals();
  const {handleLogout,userData}= useContext(AuthContext);
  const navigate= useNavigate();


  const logout=()=>{
    handleLogout();
    navigate("/login")
  }
 
  
  return (
    <>
       <Modals show={show} handleClose={handleClose}>
      <ChnangePassword handleLogout={logout}/>
    </Modals>
  
    <div className={`sidebar  ${toogle ? 'active' : ''}`}>
    <div className=" my-5">
    <img className=" d-md-block " src={Logo} alt="logo" />
    </div>

    <ul className=" d-flex flex-column gap-4">

      <li>
        <Link to="/dashboard" className=" d-flex align-items-center text-white">
        <MdHome  className="me-3" size={25}/>
          <span className=" d-md-block ">Home</span>
        </Link>
      </li>

      {userData?.userGroup==="SuperAdmin"&&
       <>
        <li>
        <Link to="/dashboard/users" className=" d-flex align-items-center text-white"> 
        <FaUserFriends  className="me-3" size={25}/>
          <span className=" d-md-block ">Users</span>
        </Link>
      </li>
   
      <li>
        <Link to="/dashboard/categories" className=" d-flex align-items-center text-white">
        <FaCalendarAlt  className="me-3" size={25}/>
          <span className=" d-md-block ">Categories</span>
        </Link>
      </li>
      </>
    }
    
      

      <li>
        <Link to="/dashboard/recipes" className=" d-flex align-items-center text-white">
        <LuTable className="me-3" size={25}/>
          <span className=" d-md-block ">Recipes</span>
        </Link>
      </li>


      {userData?.userGroup==="SystemUser"&&
        <li>
        <Link to="/dashboard/favorites" className=" d-flex align-items-center text-white">
        <CiHeart className="me-3" size={25}/>
          <span className=" d-md-block ">Favorites</span>
        </Link>
      </li>
      }
      


      <li>
        <Link  className=" d-flex align-items-center text-white" onClick={ handleShow} >
        <IoLockOpenOutline  className="me-3" size={25}/>
          <span className=" d-md-block "> Change Password</span>
        </Link>
      </li>



      <li>
        <Link   className=" d-flex align-items-center text-white"  onClick={logout} >
        <FaArrowRightFromBracket className="me-3" size={25}/>
          <span className=" d-md-block ">Logout</span>
        </Link>
      </li>

    </ul>

   

  </div>
  </>
  )
}

export default SideBar;