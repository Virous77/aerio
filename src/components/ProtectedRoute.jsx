import React from "react";
import { useAuthContext } from "../stores/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
