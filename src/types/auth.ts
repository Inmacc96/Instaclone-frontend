export interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}

export type SignUpFormTouched = Record<keyof SignUpFormData, boolean>;

export interface ValidateSignUpForm {
  name: (v: string) => string;
  username: (v: string) => string;
  email: (v: string) => string;
  password: (v: string, w: string) => string;
  repeatpassword: (v: string, w: string) => string;
}

export interface LogInFormData {
  email: string;
  password: string;
}

export type LogInFormTouched = Record<keyof LogInFormData, boolean>;

export interface ValidateLogInForm {
  email: (v: string) => string;
  password: (v: string) => string;
}

export interface DecodedToken {
  id: string;
  name: string;
  username: string;
  email: string;
}
