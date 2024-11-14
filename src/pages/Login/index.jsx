import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm} from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";
import Input from "../../components/UI/Input";
import LoadingButton from "../../components/UI/LoadingButton ";


const Login = () => {

  const { register, handleSubmit ,formState: { errors }} = useForm();

  const {submitForm,loading}= useSubmitForm("Users/Login","Login Successfully","/dashboard");
  const {showPassword, handleShowPassword}= usePassword()


  return (
    <div className="auth-container">
      <div className="overlay">
        <div className=" bg-white p-5 rounded auth-form">
        
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>

          <h3 className="auth-title">Log In</h3>
          <p className="auth-headtitle">Welcome Back! Please enter your details</p>

          <form onSubmit={handleSubmit(submitForm)}>

            <Input 
            label="email" 
            type="email"
             placeholder="Enter your E-mail" 
             Icon={AiOutlineMail} 
             register={register} 
             validation={{required: "Email is required", pattern: {
              value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 
              message: "Please enter a valid email address."
            }}}
            error={errors.email}
            />

          <Input 
            label="password" 
            type={showPassword ? "text" : "password"}
             placeholder="Enter your Password" 
             Icon={CiLock} 
             register={register} 
             autoComplete="off"
             validation={{required: "Password is required", pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
              message: "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
            }}}
            error={errors.password}
            onClick={handleShowPassword}
            showPasswordIcon={showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            />


        <div className=" d-flex justify-content-between align-items-center mt-3">
          <Link className="text-success" to="/register">Register Now?</Link>
          <Link className="text-success" to="/forget-password">Forgot Password?</Link>
        </div>

        <LoadingButton loading={loading} buttonText="Login"/>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
