import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ publicPage }) {
  const user = useSelector((state) => state.auth.user);

  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}