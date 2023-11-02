import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(SessionContext);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return isLoading ? <Loader/> : <>{children}</>;
};

export default PrivateRoute;
