export interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}

export type SignUpFormTouched = Record<keyof SignUpFormData, boolean>;

export interface ValidateSignUpForm {
  name: (v: SignUpFormData) => string;
  username: (v: SignUpFormData) => string;
  email: (v: SignUpFormData) => string;
  password: (v: SignUpFormData) => string;
  repeatpassword: (v: SignUpFormData) => string;
}

export interface LogInFormData {
  email: string;
  password: string;
}

export type LogInFormTouched = Record<keyof LogInFormData, boolean>;

export interface ValidateLogInForm {
  email: (v: LogInFormData) => string;
  password: (v: LogInFormData) => string;
}

export interface DecodedToken {
  id: string;
  name: string;
  username: string;
  email: string;
}
