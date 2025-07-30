import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "Components/NavBar";

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
