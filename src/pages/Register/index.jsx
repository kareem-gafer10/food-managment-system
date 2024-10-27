import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import baseInstance from "../../config/baseInstance";
import useSubmitForm from "../../hooks/useSubmitForm";
import usePassword from "../../hooks/usePassword";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const Register = () => {
  
  const {register,handleSubmit,watch,formState:{ errors }} = useForm()
  const password = watch("password");
  const navigate = useNavigate();
  const {loading,setLoading}= useSubmitForm();
  const {showPassword, handleShowPassword}= usePassword()



  const appendToFormData=(data)=>{
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  }





  const onSubmit = async(data) => {
    let resgiterFormData = appendToFormData(data);
      try {
        setLoading(true);
        const response = await baseInstance.post("Users/Register",resgiterFormData);
        toast.success(response.data.message);
        navigate("/verify-account");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    
  }

  

  
  return (
    <div className="auth-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form auth-register">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
          <h3 className="auth-title">Register</h3>
          <p className="auth-headtitle">
          Welcome Back! Please enter your details
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row">

            <div className="col-md-6">

            <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text"><AiOutlineMail /></span>
        <input type="text" className="form-control" placeholder="User Name"
          {...register("userName", { required: "userName is Required",
             maxLength: {  value: 8,
               message: "The userName may not be greater than 8 characters"},
               pattern: {value:  /^[A-Za-z]+\d+$/,
              message: "The userName must contain characters and end with numbers",
                            },
            })}
        />
           </div>
           {errors.userName && <p className="text-danger">{errors.userName.message}</p>}

        <div className="input-group mb-3 flex-nowrap">
        <span className="input-group-text"><CiLock /></span>
        <input type="text" className="form-control" placeholder="Country"
           {...register("country", {  required: "country is Required"})}
          />
        </div>
        {errors.country && <p className="text-danger">{errors.country.message}</p>}


            </div>

            <div className="col-md-6">

        <div className="input-group flex-nowrap mb-3">
      <span className="input-group-text"><AiOutlineMail /></span>
      <input type="email"
         className="form-control" 
         placeholder="Enter your E-mail"
         {...register("email", { 
        required: "Email is required",  
      pattern: {
       value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 
       message: "Please enter a valid email address."
               }
              })}
         />
      </div>
      {errors.email && <p className=" text-danger">
          {errors.email.message}
          </p>}



        <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text"><CiLock /></span>
      <input type="text" className="form-control" placeholder="Phone Number"
         {...register("PhoneNumber", { required: "PhoneNumber is Required" })}
      />
        </div>
        {errors.PhoneNumber && <p className=" text-danger">
          {errors.PhoneNumber.message}
          </p>}

            </div>

          <div className="col-md-6">

           
          <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text"><CiLock /></span>
        <input type={`${showPassword ? "text" : "password"}`} 
        className="form-control" 
        placeholder="Password" 
        autoComplete="off"
        {...register("password", {
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
      {errors.password && <p className=" text-danger">
          {errors.password.message}
      </p>}

          </div>

        <div className="col-md-6">
         <div className="input-group flex-nowrap mb-3">
              <span className="input-group-text"><CiLock /></span>
              <input type={`${showPassword ? "text" : "password"}`}
                className="form-control"
                placeholder="Confirm Password"
                autoComplete="off"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === password || "Passwords do not match"
                })}
              />

                 <div className="show-password" onClick={handleShowPassword}>
        {showPassword ?  <IoMdEyeOff size={20}/> :<IoMdEye size={20} /> }
        </div>

            </div>
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
        </div>

          <div className="col-12">
            <input type="file" 
            className="form-control" 
            {...register("profileImage",{ required: "profileImage is Required"})} 
            accept=".jpg,.png" />
            {errors.profileImage && <p className="text-danger">{errors.profileImage.message}</p>}
        </div>






          </div>
       
    
      <div className=" d-flex justify-content-end">
        <Link to="/login" className="text-success">
        Login?
        </Link>
      </div>
        
        

        
        <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Register": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Register;