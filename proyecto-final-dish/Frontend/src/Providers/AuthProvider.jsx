import React, { createContext, useEffect, useState } from 'react'
import { API } from '../utils/API/api.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)
  const [user, setUser] = useState(null)

  const verifyToken = async () => {
    try {
      const response = await API(
        '/api/v1/users/verify-token',
        'GET',
        null,
        true
      )
      if (response?.message === 'Token válido') {
        setUser(response.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Error verificando el token:', error)
      return false
    }
  }

  const fetchUserMenu = async () => {
    if (!localStorage.getItem('myMenu')) {
      const menu = await API('/api/v1/menus/get-user-menu', 'GET', null, true)

      if (menu && menu.meals) {
        const transformedMenu = {
          weekMenu: menu.meals.map((day) => ({
            day: day.day,
            meals: day.recipes
          })),
          mealsPerDay: 3
        }

        localStorage.setItem('myMenu', JSON.stringify(transformedMenu))
      }
    }
  }

  const checkToken = async () => {
    const valid = await verifyToken()
    setIsAuth(valid)

    if (valid) {
      await fetchUserMenu()
    } else {
      localStorage.removeItem('myMenu')
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, checkToken, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
