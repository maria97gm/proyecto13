import React, { useEffect, useState, useMemo } from 'react'
import { API } from '../../utils/API/api'
import RecipeCard from '../../Components/RecipeCard/RecipeCard'
import RecipeFilters from '../../Components/RecipeFilters/RecipeFilters'
import Pagination from '../../Components/Pagination/Pagination'
import Loading from '../../Components/Loading/Loading'
import { useChef } from '../../Hooks/useChef'
import { usePagination } from '../../Hooks/usePagination'
import './ControlPanel.css'

const ControlPanel = () => {
  const { isAuth, user, loading } = useChef()
  const [recipes, setRecipes] = useState([])
  const [filters, setFilters] = useState({ restrictions: [], goals: [] })
  const itemsPerPage = 15

  useEffect(() => {
    if (isAuth && user?.rol === 'chef') {
      const fetchRecipes = async () => {
        try {
          const data = await API('/api/v1/recipes', 'GET', null, true)
          setRecipes(data)
        } catch (error) {
          console.error('Error al cargar recetas', error)
        }
      }
      fetchRecipes()
    }
  }, [isAuth, user])

  if (loading) return <Loading />

  const { restrictionsOptions, goalsOptions } = useMemo(() => {
    const restrictions = []
    const goals = []
    const goalsLabels = {
      eat_healthy: 'Comer saludable',
      lose_weight: 'Bajar peso',
      gain_muscle: 'Ganar músculo'
    }

    recipes.forEach((recipe) => {
      recipe.tags?.forEach((tag) => {
        if (!restrictions.find((opt) => opt.value === tag)) {
          restrictions.push({ value: tag, label: tag })
        }
      })
      recipe.goals?.forEach((goal) => {
        if (!goals.find((opt) => opt.value === goal)) {
          goals.push({ value: goal, label: goalsLabels[goal] || goal })
        }
      })
    })

    return { restrictionsOptions: restrictions, goalsOptions: goals }
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchRestrictions = filters.restrictions.every((r) =>
        recipe.tags?.includes(r)
      )
      const matchGoals =
        filters.goals.length === 0 ||
        filters.goals.some((g) => recipe.goals?.includes(g))
      return matchRestrictions && matchGoals
    })
  }, [recipes, filters])

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredRecipes,
    itemsPerPage
  )

  return (
    <div>
      <h1>Listado de recetas</h1>
      <p>
        <strong>Nº total de recetas:</strong> {filteredRecipes.length}
      </p>

      <RecipeFilters
        restrictionsOptions={restrictionsOptions}
        goalsOptions={goalsOptions}
        filters={filters}
        setFilters={setFilters}
      />

      <div className='recipe-list'>
        {currentItems.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  )
}

export default ControlPanel
