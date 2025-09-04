import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotAllowed from "../pages/NotAllowed";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import ModOrAdminPage from "../pages/ModOrAdminPage";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
      <AdminPage>
        <Add />
      </AdminPage>
    ),
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
    path: "/profile",
    element: (
      <UserPage>
        <Profile />
      </UserPage>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <ModOrAdminPage>
        <Update />
      </ModOrAdminPage>
    ),
  },
  {
    path: "/notallowed",
    element: <NotAllowed />,
  },
]);
export default router;
