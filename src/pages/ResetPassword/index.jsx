import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";
import LoadingButton from "../../components/UI/LoadingButton ";
import Input from "../../components/UI/Input";

const ResetPassword = () => {


  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const password = watch("password");

  const {submitForm,loading}= useSubmitForm("Users/Reset",false,"/login");
  const {showPassword, handleShowPassword,
    showConfirmPassword, handleShowConfirmPassword}
    = usePassword()
  
 

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

       

          <Input
            label="seed"
            type="text"
            placeholder="OTP"
            Icon={AiOutlineMail}
            register={register}
            validation={{ required: "OTP is required" }}
            error={errors.seed}
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
      

      <Input
        label="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password" 
        autoComplete="off"
        Icon={CiLock}
        register={register}
        validation={{
          required: "Confirm Password is required",
          pattern: {
            validate: (value) => value === password || "Passwords do not match"
          }
        }}
        error={errors.confirmPassword}
        onClick={handleShowConfirmPassword}
        showPasswordIcon={showConfirmPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
      />
      

        <LoadingButton loading={loading} buttonText="Reset Password"/>


          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default ResetPassword;