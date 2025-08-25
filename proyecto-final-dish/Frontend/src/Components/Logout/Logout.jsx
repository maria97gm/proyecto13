import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProvider'

const Logout = () => {
  const navigate = useNavigate()
  const { checkToken } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('myMenu')
    navigate('/')
    checkToken()
  }
  return <button onClick={handleLogout}>Cerrar sesión</button>
}

export default Logout
