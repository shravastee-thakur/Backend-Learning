import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      if (res?.data?.accessToken) {
        setAccessToken(res.data.accessToken);
      } else {
        console.error("No token returned");
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const refresh = async () => {
    try {
      const res = await axios.post("/auth/refresh-token");
      setAccessToken(res.data.accessToken);
    } catch (err) {
      setAccessToken(null);
    }
  };

  const logout = async () => {
    const res = await axios.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
