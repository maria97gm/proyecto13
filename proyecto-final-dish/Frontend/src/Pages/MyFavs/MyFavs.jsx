import React, { useContext, useEffect, useState } from 'react'
import RecipeCard from '../../Components/RecipeCard/RecipeCard'
import './MyFavs.css'
import { useNavigate } from 'react-router-dom'
import { API } from '../../utils/API/api'
import { AuthContext } from '../../Providers/AuthProvider'
import Loading from '../../Components/Loading/Loading'

const MyFavs = () => {
  const [myFavs, setMyFavs] = useState([])
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await API('/api/v1/users/favorites', 'GET', null, true)
        setMyFavs(res.recipes || [])
      } catch (err) {
        console.error('Error al obtener favoritos:', err)
      }
    }

    if (isAuth === false) {
      navigate('/')
    }

    if (isAuth === true) {
      fetchFavorites()
    }
  }, [isAuth, navigate])

  if (isAuth === null) return <Loading />
  if (isAuth && !myFavs.length)
    return <p>No tienes recetas favoritas todavía.</p>

  return (
    <div className='my-favs'>
      <h1>Aquí tienes tus recetas favoritísimas</h1>
      <div className='meals-grid'>
        {myFavs.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default MyFavs
