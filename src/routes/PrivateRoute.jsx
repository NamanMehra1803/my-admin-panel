import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAdmin = Boolean(localStorage.getItem("admin-id"));
  return isAdmin ? children : <Navigate to="/admin" replace />;
}
