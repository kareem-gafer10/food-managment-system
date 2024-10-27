import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { useForm} from "react-hook-form";
import toast from "react-hot-toast";
import baseInstance from "../../config/baseInstance";
import { useNavigate } from "react-router-dom";
import useSubmitForm from "../../hooks/useSubmitForm";

const VerifyAccount = () => {

  const { register, handleSubmit ,formState: { errors }} = useForm();
  const navigate = useNavigate();
  const { loading,setLoading } = useSubmitForm();
  const onSubmit= async(data)=>{
    try {
      setLoading(true);
      const response = await baseInstance.put("Users/Verify",data);
      toast.success(response.data.message)
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }




    return (
      <div className="auth-container">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
          <h3 className="auth-title">Verify Account</h3>
          <p className="auth-headtitle">Welcome Back! Please enter your details</p>

          <form onSubmit={handleSubmit(onSubmit)}>

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

        <div className="input-group flex-nowrap">
        <span className="input-group-text"><CiLock /></span>
        <input type="text" className="form-control" placeholder="Code"
           {...register("code", {  required: "code is Required" })}
        />
      </div>
      {errors.code && <p className=" text-danger">
          {errors.code.message}
          </p>}
        

       
        <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
        {!loading ? "Verify": <div className="spinner-border" style={{width: "25px", height: "25px"}} > 
        </div>}
        </button>

          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default VerifyAccount;