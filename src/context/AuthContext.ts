import { createContext } from "react";

interface AuthContextProps {
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
