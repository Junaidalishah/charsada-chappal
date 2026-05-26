import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(true);

  // LOAD USER
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");

      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log(error);

      localStorage.removeItem("userInfo");
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));

    setUserInfo(data);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("userInfo");

    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
