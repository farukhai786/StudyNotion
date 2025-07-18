// Only allow access if token exists (i.e. user is logged in)
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  // ✅ If logged in → allow
  // ❌ If not logged in → redirect to /login
  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
