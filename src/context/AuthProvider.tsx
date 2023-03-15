import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
