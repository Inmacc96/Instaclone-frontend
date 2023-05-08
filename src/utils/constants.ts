import {
  SignUpFormData,
  SignUpFormTouched,
  validateSignUpForm,
} from "../types/auth";
import { validateEmail, validateName, validatePassword, validateRepeatPassword, validateUsername } from "../validations/validateSignUp";

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

export const VALIDATIONS_SIGNUP: validateSignUpForm = {
  name: validateName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  repeatpassword: validateRepeatPassword,
};
