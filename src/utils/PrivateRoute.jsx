import { Navigate } from "react-router-dom";
import { isTokenValid } from "./auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Memeriksa apakah token valid
  if (!isTokenValid(token)) {
    // Jika token tidak valid dan berada di rute admin, arahkan ke halaman login admin
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
