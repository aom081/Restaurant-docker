import { createBrowserRouter } from "react-router";
import Add from "../Pages/Add";
import Home from "../Pages/Home";
import Update from "../Pages/Update";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);
export default router;
