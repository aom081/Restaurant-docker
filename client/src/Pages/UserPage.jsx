import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const UserPage = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserPage;
