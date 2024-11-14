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
import LoadingButton from "../../components/UI/LoadingButton ";
import Input from "../../components/UI/Input";
const Register = () => {
  
  const {register,handleSubmit,watch,formState:{ errors }} = useForm()
  const password = watch("password");
  const navigate = useNavigate();
  const {loading,setLoading}= useSubmitForm();
  const {showPassword, handleShowPassword,
    showConfirmPassword, handleShowConfirmPassword}
    = usePassword()

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
            <Input
            label="userName"
            type="text"
            placeholder="Enter your User Name"
            Icon={AiOutlineMail}
            register={register}
            error={errors.userName}
            validation={{ required: "userName is required",
             maxLength: {  value: 8,
               message: "The userName may not be greater than 8 characters"},
               pattern: {value:  /^[A-Za-z]+\d+$/,
              message: "The userName must contain characters and end with numbers",
              },
            }}
            />

        <Input
          label="country"
          type="text"
          placeholder="Enter your country"
          Icon={CiLock}
          register={register}
          error={errors.country}
          validation={{ required: "country is required" }}
        />
            </div>

            <div className="col-md-6">
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
            label="PhoneNumber"
            type="tel"
            placeholder="Enter your Phone Number"
            Icon={CiLock}
            register={register}
            error={errors.PhoneNumber}
            validation={{ required: "PhoneNumber is required" }}
          />
            </div>

          <div className="col-md-6">
          <Input 
            label="password" 
            type={showPassword ? "text" : "password"}
             placeholder="Enter your Password" 
              autoComplete="off"
             Icon={CiLock} 
             register={register} 
             validation={{required: "Password is required", pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
              message: "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
            }}}
            error={errors.password}
            onClick={handleShowPassword}
            showPasswordIcon={showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            />
          </div>

        <div className="col-md-6">
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
        
      <LoadingButton loading={loading} buttonText="Register"/>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Register;