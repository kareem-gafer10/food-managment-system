import Logo from "../../assets/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { useForm} from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";



const ForgetPassword = () => {


  const { register, handleSubmit ,formState: { errors }} = useForm();

  const {submitForm,loading}= useSubmitForm("Users/Reset/Request",false,"/reset-password");




    return (
      <div className="auth-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
          <h3 className="auth-title">Forgot Your Password?</h3>
          <p className="auth-headtitle">
          No worries! Please enter your email and we will send a password reset link
          </p>

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


        <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Forget Password": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>

          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default ForgetPassword;