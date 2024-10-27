import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";

const ResetPassword = () => {


  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const password = watch("password");

  const {submitForm,loading}= useSubmitForm("Users/Reset",false,"/login");
  const {showPassword, handleShowPassword}= usePassword()

  
 

    return (
      <div className="auth-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
          <h3 className="auth-title">Reset Password</h3>
          <p className="auth-headtitle">Please Enter Your Otp or Check Your Inbox</p>

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

        <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text"><AiOutlineMail /></span>
        <input type="text" className="form-control" placeholder="OTP"
          {...register("seed", {
              required: "OTP IS Required",
          })}

        />
        </div>
        {errors.seed && <p className=" text-danger">
          {errors.seed.message}
          </p>}



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

      <div className="input-group flex-nowrap mb-3">
              <span className="input-group-text"><CiLock /></span>
              <input type={`${showPassword ? "text" : "password"}`}
                className="form-control"
                placeholder="Confirm Password"
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
      

     
        <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Reset Password": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>

          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default ResetPassword;