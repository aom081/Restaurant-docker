import { createBrowserRouter } from "react-router-dom";
import Add from "../Pages/Add";
import Home from "../Pages/Home";
import Update from "../Pages/Update";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AdminPage from "../Components/AdminPage";
import Layout from "../Components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <AdminPage />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "update/:id",
        element: <Update />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
