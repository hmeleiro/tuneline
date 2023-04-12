import { createContext, useState } from "react";

export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ token, setToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
