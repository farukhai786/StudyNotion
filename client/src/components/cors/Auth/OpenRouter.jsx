// Only allow access if token does NOT exist (i.e. user is NOT logged in)
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  // ❌ If logged in → redirect to dashboard
  // ✅ If not logged in → allow
  return !token ? children : <Navigate to="/dashboard/my-profile" replace />
}

export default OpenRoute
