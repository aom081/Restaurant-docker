import React from "react";
import { Outlet } from "react-router";
import NavBar from "./Navbar.jsx";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
