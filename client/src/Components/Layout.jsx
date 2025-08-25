import React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

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
