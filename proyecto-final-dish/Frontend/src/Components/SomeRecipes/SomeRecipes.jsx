import React, { useEffect, useState } from 'react'
import { API } from '../../utils/API/api'
import RecipeCard from '../RecipeCard/RecipeCard'
import Loading from '../Loading/Loading'
import './SomeRecipes.css'

const SomeRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await API('/api/v1/recipes', 'GET', null, true)

        const shuffled = allRecipes.sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, 4)

        setRecipes(selected)
      } catch (err) {
        console.error('Error al cargar recetas', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <h2>Algunas de nuestras recetas</h2>
      <div className='some-recipes'>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </>
  )
}

export default SomeRecipes
