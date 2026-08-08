import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
};

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        storeTokenInLS,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;