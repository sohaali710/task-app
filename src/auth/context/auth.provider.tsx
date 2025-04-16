import { useState } from "react";
import { AuthContext } from "./auth.context";
import { loginHelper, logoutHelper } from "./auth.helper";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (newToken: string, redirectTo: string) => {
    console.log("Logging in with token:", newToken);
    setToken(loginHelper(newToken));
    window.location.href = redirectTo;
  };

  const logout = (callback?: () => void) => {
    logoutHelper();
    setToken(null);
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
