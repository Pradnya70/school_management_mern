import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) {
      setAuthenticated(true);
    }

    console.log(userStr);

    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // if (userStr) {
    //     try {
    //       setUser (JSON.parse(userStr));
    //     } catch (error) {
    //       console.error("Invalid JSON string:", error);
    //     }
    //   }
  }, []);

  const login = (credentials) => {
    setAuthenticated(true);
    setUser(credentials);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
