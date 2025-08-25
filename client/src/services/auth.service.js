import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (username, name, email, password) => {
  return await api.post(API_URL + "/signup", {
    username,
    name,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/signin", { username, password });
  //saving user data to local storage
  if (!response.data.token) {
    return response;
  }
  TokenService.setUser(response.data);
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
