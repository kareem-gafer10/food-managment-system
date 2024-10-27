import { useState } from "react";

const usePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, handleShowPassword };
};

export default usePassword;
