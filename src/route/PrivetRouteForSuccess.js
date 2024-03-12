import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const PrivetRouteForSuccess = () => {

  const isAuthenticated = localStorage.getItem('successfully_registered')

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default PrivetRouteForSuccess