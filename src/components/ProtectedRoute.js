import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  return loggedIn ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;