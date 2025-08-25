import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './RecipeCard.css'
import { FavoritesContext } from '../../Providers/FavoritesProvider'
import { useModal } from '../../Hooks/useModal'
import Modal from '../Modal/Modal'
import { AuthContext } from '../../Providers/AuthProvider'

const RecipeCard = ({ recipe }) => {
  const { isFavorite } = useContext(FavoritesContext)
  const { isAuth } = useContext(AuthContext)
  const isFav = isFavorite(recipe._id)
  const { showModal, message, openModal, closeModal } = useModal()
  const navigate = useNavigate()

  const handleViewRecipe = (e) => {
    e.preventDefault()
    if (isAuth) {
      navigate(`/recipes/${recipe._id}`)
    } else {
      openModal('Tienes que estar registrado para disfrutar de nuestra APP')
    }
  }

  return (
    <div className='meal-card'>
      {isFav && <span className='fav-heart'>❤️</span>}

      <img src={recipe.image} alt={recipe.name} />
      <h3>{recipe.name}</h3>

      <button onClick={handleViewRecipe}>Ver receta</button>
      {showModal && (
        <Modal title='Acceso restringido'>
          <p>{message}</p>
          <button
            onClick={() => {
              closeModal()
              navigate('/')
            }}
          >
            Volver al INICIO para loguearme
          </button>
        </Modal>
      )}
    </div>
  )
}

export default RecipeCard
