import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, roles: userRoles } = useSelector((state) => state.auth);

  console.log(userRoles)

  const x = userRoles.some((role) => roles.includes(role))

  console.log(x)


  if (!isAuthenticated === true) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !userRoles.some((role) => roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
