import React from 'react'
import Select from 'react-select'

const RecipeFilters = ({
  restrictionsOptions,
  goalsOptions,
  filters,
  setFilters
}) => {
  return (
    <div>
      <Select
        isMulti
        options={restrictionsOptions}
        placeholder='Filtrar por restricciones...'
        value={restrictionsOptions.filter((opt) =>
          filters.restrictions.includes(opt.value)
        )}
        onChange={(selected) =>
          setFilters({
            ...filters,
            restrictions: selected?.map((opt) => opt.value) || []
          })
        }
      />

      <Select
        isMulti
        options={goalsOptions}
        placeholder='Filtrar por objetivos...'
        value={goalsOptions.filter((opt) => filters.goals.includes(opt.value))}
        onChange={(selected) =>
          setFilters({
            ...filters,
            goals: selected?.map((opt) => opt.value) || []
          })
        }
      />

      <button onClick={() => setFilters({ restrictions: [], goals: [] })}>
        Limpiar filtros
      </button>
    </div>
  )
}

export default RecipeFilters
