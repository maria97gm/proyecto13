import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FavoritesContext } from '../../../Providers/FavoritesProvider'
import './UserRecipeActions.css'

const UserRecipeActions = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
  const isFav = isFavorite(id)
  return (
    <div>
      <button onClick={() => navigate('/my-menu')}>
        Volver a mi menú semanal
      </button>
      {isFav ? (
        <>
          <button onClick={() => navigate('/my-favs')}>
            Ver mis recetas favs ❤️
          </button>
          <button onClick={() => toggleFavorite(id)}>
            Quitar de favoritos
          </button>
        </>
      ) : (
        <button onClick={() => toggleFavorite(id)}>
          Añadir a favorito esta receta
        </button>
      )}
    </div>
  )
}

export default UserRecipeActions
