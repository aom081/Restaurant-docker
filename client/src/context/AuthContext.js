import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../Services/AuthService";
import TokenService from "../services/token.service";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);
  const login = (user) => setUser(user);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [user]);

  const getUser = () => {
    const currentUser = TokenService.getUser();
    return currentUser;
  };
};
