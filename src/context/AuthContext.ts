import { createContext } from "react";
import { DecodedToken } from "../types/auth";

interface AuthContextProps {
  auth: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
