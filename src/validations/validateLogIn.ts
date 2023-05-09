export const validateEmailLogin = (email: string) => {
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

export const validatePasswordLogin = (password: string) => {
  if (!password) {
    return "Password is required";
  } else {
    return "";
  }
};
