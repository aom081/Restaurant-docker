import { useState } from "react";
import AuthService from "../services/auth.service";
// Frontend: Register.jsx
const handleSubmit = async () => {
  const newUser = await AuthService.register(
    user.username, user.name, user.email, user.password
  );
  if (newUser.status === 200) {
    navigate("/login");
  }
};

// Backend: auth.controller.js
const newUser = {
  username, name, email,
  password: bcrypt.hashSync(password, 8)
};
User.create(newUser).then((user) => {
  user.setRoles([1]); // Default user role
});import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newUser = await AuthService.register(
        user.username,
        user.name,
        user.email,
        user.password
      );
      if (newUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: newUser.data.message,
          icon: "success",
        }).then(() => {
          setUser({
            username: "",
            name: "",
            email: "",
            password: "",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "User Login",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  const handleCancel = () => {
    setUser({
      username: "",
      name: "",
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Sign up to get started!
        </p>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow w-full"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow w-full"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow w-full"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            value={user.password}
            className="grow w-full"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all"
          onClick={handleSubmit}
        >
          Register
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition-all"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
