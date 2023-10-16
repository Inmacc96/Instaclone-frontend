import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { decodeToken, getToken, removeToken } from "../utils/token";
import { User } from "../__generated__/graphql";
import { DecodedToken } from "../types/auth";

interface AuthProviderProps {
  children: JSX.Element;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const setUser = (user: DecodedToken | null) => {
    setAuth(user);
  };

  const logOut = () => {
    removeToken();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setUser , logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
