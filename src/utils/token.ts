import jwtDecode, { JwtPayload } from "jwt-decode";
import { DecodedToken } from "../types/auth";

import { TOKEN } from "./constants";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const decodeToken = (token: string): DecodedToken => {
  const { id, email, name, username } = jwtDecode<DecodedToken & JwtPayload>(
    token
  );
  return { id, email, name, username };
};
