import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import Avatar from "../assets/avatar.png"
import {  FaBell } from "react-icons/fa"
import { useContext, useEffect, useState} from "react"
import { AuthContext } from "../context/AuthContext"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"
import baseInstance from "../config/baseInstance"
const Navbar = ({handleToogle, toogle}) => {
  const {userData} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);



  const getCurrentUser=async()=>{
    try {
      const response = await baseInstance.get("Users/currentUser",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
       
      })
      
      
      setCurrentUser(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getCurrentUser();
  }, []);


  



  return (
   
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">

   


    <div className=" mx-md-5 text-dark cursor" onClick={handleToogle}>
    {toogle ? <HiMenuAlt1 size={30} /> :<HiMenuAlt3 size={30} />  }
    </div>

   



    <Link className="navbar-brand" to="/dashboard">
    <img src={Logo} alt="Logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center gap-3">
          {currentUser?.imagePath ? 
            <img  className='  rounded-circle profile-image'
           src={`https://upskilling-egypt.com:3006/${currentUser.imagePath}`} alt="Avatar" />
           : <img src={Avatar} alt="Avatar" />
          }
          
          <h6>{userData?.userName}</h6>
          <FaBell />
        </li>
      
      </ul>

      
    </div>
  </div>
</nav>
  
  )
}

export default Navbar