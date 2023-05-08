export interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}
export interface SignUpFormTouched {
  name: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
  repeatpassword: boolean;
}
export interface validateSignUpForm {
  name: (v: string) => string;
  username: (v: string) => string;
  email: (v: string) => string;
  password: (v: string, w: string) => string;
  repeatpassword: (v: string, w: string) => string;
}
export interface DecodedToken {
  id: string;
  name: string;
  username: string;
  email: string;
}
