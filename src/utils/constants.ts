import {
  LogInFormData,
  LogInFormTouched,
  SignUpFormData,
  SignUpFormTouched,
  ValidateLogInForm,
  ValidateSignUpForm,
} from "../types/auth";
import {
  AddCommentFormData,
  ChangeDescriptionFormData,
  ChangeDescriptionFormTouched,
  ChangeEmailFormData,
  ChangeEmailFormTouched,
  ChangePasswordFormData,
  ChangePasswordFormTouched,
  ChangeWebsiteFormData,
  ChangeWebsiteFormTouched,
  ValidateAddComment,
  ValidateChangeDescription,
  ValidateChangeEmail,
  ValidateChangePassword,
  ValidateChangeWebsite,
} from "../types/forms";
import { validateDescription } from "../validations/validateChangeDescription";
import { validateNewEmail } from "../validations/validateChangeEmail";
import {
  validateNewPassword,
  validateOldPassword,
  validateRepeatNewPassword,
} from "../validations/validateChangePassword";
import { validateWebsite } from "../validations/validateChangeWebsite";
import { AddCommentFormTouched } from "../types/forms";
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
import { validateComment } from "../validations/validateAddComment";

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

export const INITIAL_ERRORS_CHANGE_EMAIL: ChangeEmailFormData = {
  email: "",
};

export const INITIAL_TOUCHED_FIELDS_CHANGE_EMAIL: ChangeEmailFormTouched = {
  email: false,
};

export const VALIDATIONS_CHANGE_EMAIL: ValidateChangeEmail = {
  email: validateNewEmail,
};

export const INITIAL_ERRORS_CHANGE_DESCRIPTION: ChangeDescriptionFormData = {
  description: "",
};

export const INITIAL_TOUCHED_FIELDS_CHANGE_DESCRIPTION: ChangeDescriptionFormTouched =
  {
    description: false,
  };

export const VALIDATIONS_CHANGE_DESCRIPTION: ValidateChangeDescription = {
  description: validateDescription,
};

export const INITIAL_ERRORS_CHANGE_WEBSITE: ChangeWebsiteFormData = {
  website: "",
};

export const INITIAL_TOUCHED_FIELDS_CHANGE_WEBSITE: ChangeWebsiteFormTouched = {
  website: false,
};

export const VALIDATIONS_CHANGE_WEBSITE: ValidateChangeWebsite = {
  website: validateWebsite,
};

export const INITIAL_ERRORS_ADD_COMMENT: AddCommentFormData = {
  comment: "",
};

export const INITIAL_TOUCHED_FIELDS_ADD_COMMENT: AddCommentFormTouched = {
  comment: false,
};

export const VALIDATIONS_ADD_COMMENT: ValidateAddComment = {
  comment: validateComment,
};
