import Logo from "../../assets/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { useForm} from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";
import LoadingButton from "../../components/UI/LoadingButton ";
import Input from "../../components/UI/Input";



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

          <Input 
          label="email" 
          type="email"
           placeholder="Enter your E-mail" 
           Icon={AiOutlineMail} 
           register={register} 
           error={errors.email}
           validation={{required: "Email is required", pattern: {
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 
            message: "Please enter a valid email address."}
            }}
          />

          <LoadingButton loading={loading} buttonText="Forget Password" />
       

          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default ForgetPassword;