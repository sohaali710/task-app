import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string, redirectTo: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
