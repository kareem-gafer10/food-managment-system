import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form"
import baseInstance from "../../config/baseInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSubmitForm from "../../hooks/useSubmitForm";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import usePassword from "../../hooks/usePassword";
import LoadingButton from "../../components/UI/LoadingButton ";
import Input from "../../components/UI/Input";

const ChnangePassword = ({handleLogout}) => {

  const {register,handleSubmit,watch,formState:{ errors }} = useForm()
  const password = watch("newPassword");
 const navigate=useNavigate()
  const {loading,setLoading}= useSubmitForm();
  const {showPassword, handleShowPassword,
    showConfirmPassword, handleShowConfirmPassword}
    = usePassword()


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

          <Input 
            label="oldPassword" 
            type={showPassword ? "text" : "password"}
             placeholder="Enter your old Password" 
             Icon={CiLock} 
             register={register} 
             autoComplete="off"
             validation={{required: "confirm Old Password is required", pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
              message: "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
            }}}
            error={errors.oldPassword}
            onClick={handleShowPassword}
            showPasswordIcon={showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            />


          <Input 
            label="newPassword" 
            type={showConfirmPassword ? "text" : "password"}
             placeholder="Enter your new Password" 
             Icon={CiLock} 
             register={register} 
             autoComplete="off"
             validation={{required: "confirm New Password is required", pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
              message: "New Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
            }}}
            error={errors.newPassword}
            onClick={handleShowConfirmPassword}
            showPasswordIcon={showConfirmPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            />

          <Input 
            label="confirmNewPassword" 
            type={showConfirmPassword ? "text" : "password"}
             placeholder="Enter your confirm New Password" 
             Icon={CiLock} 
             register={register} 
             autoComplete="off"
             validation={{
          required: "confirm New Password is required",
          pattern: {
            validate: (value) => value === password || "Passwords do not match"
          }
        }}
            error={errors.confirmNewPassword}
            onClick={handleShowConfirmPassword}
            showPasswordIcon={showConfirmPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            />

    <LoadingButton loading={loading} buttonText="Change Password"/>
    
        </form>

      </div>
    </div>
  </div>
  )
}

export default ChnangePassword;