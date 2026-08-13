import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard/Dashboard";

const routes = [
  { path: "/dashboard", element: <Dashboard /> },
];

export const routeComponents = routes.map((route) => (
  <Route key={route.path} path={route.path} element={route.element} />
);
