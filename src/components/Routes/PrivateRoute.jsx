import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ redirectTo, children }) {
  return localStorage.getItem("session_id") ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
