import Header from "../../components/Header";
import HeaderImg from "../../assets/header.png";
import SpecialTitle from "../../components/SpecialTitle";
import DisplayCategories from "../../components/DisplayCategories";

const Categories = () => {
  return (
    <div className=" mt-6">
      <Header
        title="Categories Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        img={HeaderImg}
      />
      
      <DisplayCategories />
    </div>
  );
};

export default Categories;

















// import { Link } from "react-router-dom"
// import Logo from "../assets/logo.png"
// import Avatar from "../assets/avatar.png"
// import {  FaBell } from "react-icons/fa"
// import { useContext} from "react"
// import { AuthContext } from "../context/AuthContext"
// // import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"
// const Navbar = () => {
//   const {userData,currentUser} = useContext(AuthContext);






  



//   return (
   
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">

   

// {/* 
//     <Link className=" mx-5 text-dark" onClick={handleToogle}>
//     {toogle ? <HiMenuAlt1 size={30} /> :<HiMenuAlt3 size={30} />  }
//     </Link> */}

   



//     <Link className="navbar-brand" to="/dashboard">
//     <img src={Logo} alt="Logo" />
//     </Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
    
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         <li className="nav-item d-flex align-items-center gap-3">
//           {currentUser?.imagePath ? 
//             <img  className='  rounded-circle profile-image'
//            src={`https://upskilling-egypt.com:3006/${currentUser.imagePath}`} alt="Avatar" />
//            : <img src={Avatar} alt="Avatar" />
//           }
          
//           <h6>{userData?.userName}</h6>
//           <FaBell />
//         </li>
      
//       </ul>

      
//     </div>
//   </div>
// </nav>
  
//   )
// }

// export default Navbar






// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import SideBar from "./Sidebar";
// import { useState } from "react";

// const MasterLayout = () => {
//   const [toogle, setToogle] = useState(false);

//   const handleToogle = () => {
//     setToogle(!toogle);
//   };

//   return (
//     <div>
//       <Navbar toogle={toogle} handleToogle={handleToogle} />
//       <div className=" d-flex  ">
//         <SideBar toogle={toogle} handleToogle={handleToogle} />
//       </div>
//       <Outlet />
//     </div>


    
//   );
// };

// export default MasterLayout;












// import { Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/3.png";
// import { CiHeart } from "react-icons/ci";
// import toast from "react-hot-toast";

// const SideBar = ({toogle}) => {


//   const {setUserData}= useContext(AuthContext);
//   const navigate= useNavigate();

  // const location = useLocation(); 
  




//   const handleLogout=()=>{
//     localStorage.removeItem("token");
//     setUserData(null);
//     toast.success("Logged out successfully!");
//     navigate("/login")
    
//   }








//   return (
//     <div className={`sidebar ${toogle ? 'active' : ''}`}>
//     <div className=" my-5">
//     <img className=" d-md-block d-none" src={Logo} alt="logo" />
//     </div>

//     <ul className=" d-flex flex-column gap-4">
//       <li>
//         <Link to="/dashboard" className=" d-flex align-items-center text-white">
//         <MdHome  className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Home</span>
//         </Link>
//       </li>

//       <li>
//         <Link to="/dashboard/users" className=" d-flex align-items-center text-white"> 
//         <FaUserFriends  className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Users</span>
//         </Link>
//       </li>

//       <li>
//         <Link to="/dashboard/recipes" className=" d-flex align-items-center text-white">
//         <LuTable className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Recipes</span>
//         </Link>
//       </li>

//       <li>
//         <Link to="/dashboard/favorites" className=" d-flex align-items-center text-white">
//         <CiHeart className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Favorites</span>
//         </Link>
//       </li>


//       <li>
//         <Link to="/dashboard/categories" className=" d-flex align-items-center text-white">
//         <FaCalendarAlt  className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Categories</span>
//         </Link>
//       </li>


//       <li>
//         <Link to="change-password" className=" d-flex align-items-center text-white">
//         <IoLockOpenOutline  className="me-3" size={25}/>
//           <span className=" d-md-block d-none"> Change Password</span>
//         </Link>
//       </li>



//       <li>
//         <Link  className=" d-flex align-items-center text-white"  onClick={handleLogout} >
//         <FaArrowRightFromBracket className="me-3" size={25}/>
//           <span className=" d-md-block d-none">Logout</span>
//         </Link>
//       </li>

//     </ul>


//   </div>
//   )
// }

// export default SideBar;

