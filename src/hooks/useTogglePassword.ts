import { useState } from "react";

const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, toggleShowPassword };
};

export default useTogglePassword;
