import React, { createContext, useState, useEffect } from 'react'
import { API } from '../utils/API/api.js'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider.jsx'

const FavoritesContext = createContext()

const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([])
  const { isAuth } = useContext(AuthContext)

  const fetchFavorites = async () => {
    try {
      const response = await API('/api/v1/users/favorites', 'GET', null, true)

      setFavoriteIds(response.recipes?.map((recipe) => recipe._id) || [])
    } catch (err) {
      console.error('Error al obtener favoritos:', err)
    }
  }

  useEffect(() => {
    if (isAuth) {
      fetchFavorites()
    } else if (isAuth === false) {
      setFavoriteIds([])
    }
  }, [isAuth])

  const isFavorite = (id) => favoriteIds.includes(id)

  const addFavorite = async (id) => {
    try {
      await API(`/api/v1/users/favorites/${id}`, 'PUT', null, true)
      setFavoriteIds((ids) => [...ids, id])
    } catch (error) {
      console.error('Error al añadir a favoritos:', error)
    }
  }

  const removeFavorite = async (id) => {
    try {
      await API(`/api/v1/users/favorites/${id}`, 'DELETE', null, true)
      setFavoriteIds((ids) => ids.filter((favId) => favId !== id))
    } catch (error) {
      console.error('Error al quitar de favoritos:', error)
    }
  }

  const toggleFavorite = async (id) => {
    if (isFavorite(id)) {
      await removeFavorite(id)
    } else {
      await addFavorite(id)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesContext, FavoritesProvider }
