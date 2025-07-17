import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import EditRestaurant from "../Pages/EditRestaurant";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Home />
    },
    {
        path: "/Add",
        element: <AddRestaurant />
    },
    {
        path: "/Edit/:id",
        element: <EditRestaurant />
    },
]);
export default router;