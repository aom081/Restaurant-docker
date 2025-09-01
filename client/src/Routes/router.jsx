import { createBrowserRouter } from "react-router-dom";
import Add from "../Pages/Add.jsx";
import Home from "../Pages/Home.jsx";
import Update from "../Pages/Update.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import AdminPage from "../Components/AdminPage.jsx";
import Layout from "../Components/Layout.jsx";

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
