import { LogInFormData } from "../types/auth";

export const validateEmailLogin = (formData: LogInFormData) => {
  const email = formData.email;
  if (!email) {
    return "Your email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email as string)
  ) {
    return "This email is not valid";
  } else {
    return "";
  }
};

export const validatePasswordLogin = (formData: LogInFormData) => {
  const password = formData.password;
  if (!password) {
    return "Password is required";
  } else {
    return "";
  }
};
