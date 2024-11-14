import Logo from "../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { useForm} from "react-hook-form";
import toast from "react-hot-toast";
import baseInstance from "../../config/baseInstance";
import { useNavigate } from "react-router-dom";
import useSubmitForm from "../../hooks/useSubmitForm";
import LoadingButton from "../../components/UI/LoadingButton ";
import Input from "../../components/UI/Input";

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
      <div className="auth-container  ">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className=" bg-white p-5 rounded auth-form">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
          <h3 className="auth-title">Verify Account</h3>
          <p className="auth-headtitle">Welcome Back! Please enter your details</p>

          <form onSubmit={handleSubmit(onSubmit)}>

          <Input
          label="email"
           type="email"
           placeholder="Enter your E-mail"
           Icon={AiOutlineMail}
           register={register}
           validation={{required: "Email is required", pattern: {
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 
            message: "Please enter a valid email address." }
            }}
           error={errors.email}
          />

        
        <Input 
        label="code"
        type="text"
        placeholder="Enter your Code"
        Icon={CiLock}
        register={register}
        validation={{required: "code is Required"}}  
        error={errors.code}
        />


        <LoadingButton loading={loading} buttonText="Verify"/>



          </form>

        </div>
      </div>
    </div>
    )
  }
  
  export default VerifyAccount;

