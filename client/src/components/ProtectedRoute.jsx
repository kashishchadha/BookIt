import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
  try {
    const booking = localStorage.getItem('booking')
    if (!booking) return <Navigate to="/" replace />
  } catch {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
