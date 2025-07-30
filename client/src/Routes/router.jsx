import { createBrowserRouter } from "react-router";
import Add from "../Pages/Add";
import Home from "../Pages/Home";
import Update from "../Pages/Update";
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
    path: "/update/:id",
    element: <Update />,
  },
]);
export default router;
