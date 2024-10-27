import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm} from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";
  


const Login = () => {

  const { register, handleSubmit ,formState: { errors }} = useForm();

  const {submitForm,loading}= useSubmitForm("Users/Login","Login Successfully","/dashboard");
  const {showPassword, handleShowPassword}= usePassword()





  









  return (
    <div className="auth-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form">
        
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>

          <h3 className="auth-title">Log In</h3>
          <p className="auth-headtitle">Welcome Back! Please enter your details</p>

          <form onSubmit={handleSubmit(submitForm)}>

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

        <div className="input-group flex-nowrap mb-3 position-relative">
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

        <div className=" d-flex justify-content-between align-items-center mt-3">
          <Link className="text-success" to="/register">Register Now?</Link>
          <Link className="text-success" to="/forget-password">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Login": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>
        

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
