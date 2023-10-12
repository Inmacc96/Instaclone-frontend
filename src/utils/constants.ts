import {
  LogInFormData,
  LogInFormTouched,
  SignUpFormData,
  SignUpFormTouched,
  ValidateLogInForm,
  ValidateSignUpForm,
} from "../types/auth";
import {
  ChangePasswordFormData,
  ChangePasswordFormTouched,
  ValidateChangePassword,
} from "../types/forms";
import {
  validateNewPassword,
  validateOldPassword,
  validateRepeatNewPassword,
} from "../validations/validateChangePassword";
import {
  validateEmailLogin,
  validatePasswordLogin,
} from "../validations/validateLogIn";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRepeatPassword,
  validateUsername,
} from "../validations/validateSignUp";

export const TOKEN = "token";

export const INITIAL_VALUES_SIGNUP: SignUpFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
};

export const INITIAL_ERRORS_SIGNUP: SignUpFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
};

export const INITIAL_TOUCHED_FIELDS_SIGNUP: SignUpFormTouched = {
  name: false,
  username: false,
  email: false,
  password: false,
  repeatpassword: false,
};

export const VALIDATIONS_SIGNUP: ValidateSignUpForm = {
  name: validateName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  repeatpassword: validateRepeatPassword,
};

export const INITIAL_VALUES_LOGIN: LogInFormData = {
  email: "",
  password: "",
};

export const INITIAL_ERRORS_LOGIN: LogInFormData = {
  email: "",
  password: "",
};

export const INITIAL_TOUCHED_FIELDS_LOGIN: LogInFormTouched = {
  email: false,
  password: false,
};

export const VALIDATIONS_LOGIN: ValidateLogInForm = {
  email: validateEmailLogin,
  password: validatePasswordLogin,
};

export const INITIAL_VALUES_CHANGE_PASSWORD: ChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

export const INITIAL_ERRORS_CHANGE_PASSWORD: ChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

export const INITIAL_TOUCHED_FIELDS_CHANGE_PASSWORD: ChangePasswordFormTouched =
  {
    oldPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  };

export const VALIDATIONS_CHANGE_PASSWORD: ValidateChangePassword = {
  oldPassword: validateOldPassword,
  newPassword: validateNewPassword,
  repeatNewPassword: validateRepeatNewPassword,
};
