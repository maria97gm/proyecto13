import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../../utils/API/api'
import Loading from '../Loading/Loading'
import { AuthContext } from '../../Providers/AuthProvider'
import UploadRecipeImage from '../UploadRecipeImg/UploadRecipeImg'
import ChefRecipeActions from './ChefRecipeActions/ChefRecipeActions'
import UserRecipeActions from './UserRecipeActions/UserRecipeActions'
import './RecipeInfo.css'
import { FavoritesContext } from '../../Providers/FavoritesProvider'

const RecipeInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuth, user } = useContext(AuthContext)
  const [recipe, setRecipe] = useState(null)
  const { isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    if (!isAuth) return
    const fetchRecipe = async () => {
      try {
        const res = await API(`/api/v1/recipes/${id}`, 'GET', null, true)
        setRecipe(res)
      } catch (error) {
        console.error('Error al cargar receta', error)
      }
    }
    fetchRecipe()
  }, [id, isAuth])

  if (isAuth === null) return <Loading />
  if (isAuth === false) {
    useEffect(() => navigate('/'), [navigate])
    return null
  }

  if (!recipe) return <Loading />

  const isChef = user?.rol === 'chef'
  const isFav = isFavorite(id)

  return (
    <div className='recipe-card'>
      <div className='recipe-text'>
        <h1>{recipe?.name}</h1>
        <p className='description'>{recipe?.description}</p>

        {isChef ? (
          <ChefRecipeActions recipeId={id} />
        ) : (
          <UserRecipeActions recipeId={id} />
        )}
      </div>

      <div className='recipe-image-container'>
        {isFav && <span className='fav-heart'>❤️</span>}
        <img src={recipe?.image} alt={recipe?.name} className='recipe-image' />
        <div className='tags'>
          {recipe?.tags.map((tag, i) => (
            <span key={i} className='tag'>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className='recipe-bottom'>
        <div>
          <h2>Ingredientes</h2>
          <ul>
            {recipe?.ingredientIds.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Preparación</h2>
          <ol>
            {recipe?.preparation.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {!isChef && (
        <div className='collage-recipe'>
          <h2>
            ¿Quieres subir fotos de la receta en nuestro tablón de fotitos?
          </h2>
          <p>
            Comparte cómo te ha quedado la receta, nuestros chef lo verá y le
            encantará
          </p>
          <UploadRecipeImage recipeId={id} />
        </div>
      )}
    </div>
  )
}

export default RecipeInfo
