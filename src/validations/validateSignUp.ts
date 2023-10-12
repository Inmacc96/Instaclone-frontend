import { SignUpFormData } from "../types/auth";

export const validateName = (formData: SignUpFormData) => {
  const name = formData.name
  return !name ? "Your name is required" : "";
};

export const validateUsername = (formData: SignUpFormData) => {
  const username = formData.username
  if (!username) {
    return "Your username is required";
  } else if (username && !/^[a-zA-Z0-9-]*$/.test(username as string)) {
    return "The username cannot contain spaces";
  } else {
    return "";
  }
};

export const validateEmail = (formData: SignUpFormData) => {
  const email = formData.email
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

export const validatePassword = (formData: SignUpFormData) => {
  const password = formData.password
  const repeatPassword = formData.repeatpassword
  if (!password) {
    return "Password is required";
  } else if (password !== repeatPassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};

export const validateRepeatPassword = (
  formData: SignUpFormData
) => {
  const password = formData.password
  const repeatPassword = formData.repeatpassword
  if (!repeatPassword) {
    return "Password is required";
  } else if (password !== repeatPassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};
