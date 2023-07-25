export const validateName = (name: string) => {
  return !name ? "Your name is required" : "";
};

export const validateUsername = (username: string) => {
  if (!username) {
    return "Your username is required";
  } else if (username && !/^[a-zA-Z0-9-]*$/.test(username as string)) {
    return "The username cannot contain spaces";
  } else {
    return "";
  }
};

export const validateEmail = (email: string) => {
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

export const validatePassword = (password: string, repeatpassword: string) => {
  if (!password) {
    return "Password is required";
  } else if (password !== repeatpassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};

export const validateRepeatPassword = (
  password: string,
  repeatpassword: string
) => {
  if (!repeatpassword) {
    return "Password is required";
  } else if (password !== repeatpassword) {
    return "Passwords are not equal";
  } else {
    return "";
  }
};
