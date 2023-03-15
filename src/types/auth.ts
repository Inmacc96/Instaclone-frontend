export interface newUser {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}

export interface DecodedToken {
  id: string;
  name: string;
  username: string;
  email: string;
}
