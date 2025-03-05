import React from 'react'
import { Navigate } from 'react-router-dom'

const DashboardProtected = ({children}) => {

  const token = localStorage.getItem("DashboardToken")
  return token ? children : <Navigate to="/login" replace/>
  
}

export default DashboardProtected