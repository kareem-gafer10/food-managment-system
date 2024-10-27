import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form"
import baseInstance from "../../config/baseInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";
const ChnangePassword = ({handleLogout}) => {

  const {register,handleSubmit,watch,formState:{ errors }} = useForm()
  const password = watch("newPassword");
 const navigate=useNavigate()
  const {loading,setLoading}= useSubmitForm();
  const {showPassword, handleShowPassword}= usePassword()


 const onSubmit=async(data)=>{
  try {
    setLoading(true);
      const response = await baseInstance.put("Users/ChangePassword",data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      
      toast.success(response.data.message);
      handleLogout();
      navigate("/login");


  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    setLoading(false);
  }
 }






  return (
    <div className="auth-container ">
    <div className=" d-flex justify-content-center align-items-center">
      <div className=" bg-white p-5 rounded">
      <div className="text-center">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
        <h3 className="auth-title">Change Your Password</h3>
        <p className="auth-headtitle">Enter your details below</p>

        <form onSubmit={handleSubmit(onSubmit)}>

      <div className="input-group flex-nowrap mb-3">
      <span className="input-group-text"><CiLock /></span>

      <input type={`${showPassword ? "text" : "password"}`} 
      className="form-control" 
      placeholder="Old Password"
      autoComplete="off"
      {...register("oldPassword", {
          required: "Password is required",
         pattern: {
           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message: "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
      }
        })}
      />
      
   <div className="show-password" onClick={handleShowPassword}>
        {showPassword ?  <IoMdEyeOff size={20}/> :<IoMdEye size={20} /> }
        </div>

    </div>
          {errors.oldPassword && <p className=" text-danger">
            {errors.oldPassword.message}
          </p>}



    <div className="input-group flex-nowrap mb-3">
      <span className="input-group-text"><CiLock /></span>
      <input type={`${showPassword ? "text" : "password"}`} 
      className="form-control" 
      placeholder="New Password"
      autoComplete="off"
      {...register("newPassword", {
          required: "New Password is required",
         pattern: {
           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message: "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
      }
        })}
      />

  <div className="show-password" onClick={handleShowPassword}>
        {showPassword ?  <IoMdEyeOff size={20}/> :<IoMdEye size={20} /> }
        </div>
      
    </div>
          {errors.newPassword && <p className=" text-danger">
            {errors.newPassword.message}
          </p>}



    <div className="input-group flex-nowrap mb-3">
      <span className="input-group-text"><CiLock /></span>
      <input type={`${showPassword ? "text" : "password"}`} 
      className="form-control"
       placeholder="Confirm NeW Password"
       autoComplete="off"
       {...register("confirmNewPassword", {
         required: "confirm New Password is required",
        validate: (value) => value === password || "Passwords do not match"
      })}
       />

    <div className="show-password" onClick={handleShowPassword}>
        {showPassword ?  <IoMdEyeOff size={20}/> :<IoMdEye size={20} /> }
        </div>


    </div>
    {errors.confirmNewPassword && <p className="text-danger">{errors.confirmNewPassword.message}</p>}
      

     
      <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Change Password": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>

        </form>

      </div>
    </div>
  </div>
  )
}

export default ChnangePassword;