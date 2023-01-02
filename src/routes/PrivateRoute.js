import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div>
        <CircleLoader size={50} color={"#fff"} loading={loading} />
      </div>
    );
  }
  if (user && user?.uid) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default PrivateRoute;
