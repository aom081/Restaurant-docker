import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/router.jsx";
import { RouterProvider } from "react-router-dom"; 
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NavBar />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
