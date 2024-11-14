import { useState } from "react";

const usePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return { showPassword, handleShowPassword,handleShowConfirmPassword,showConfirmPassword };
};

export default usePassword;
