import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/auth";
const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // If not logged in, redirect to login page
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
