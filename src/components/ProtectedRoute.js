import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  return loggedIn ? children : console.log('Я добрался');
}

export default ProtectedRoute;