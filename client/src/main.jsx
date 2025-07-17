import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import Footer from "./Components/Footer.jsx";
import router from "./Routes/router.jsx";
import { RouterProvider } from "react-router";
import Navbar from "./Components/Navbar.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
);
