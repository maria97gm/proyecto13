import React from 'react'
import './GeneratedMenu.css'

import RecipeCard from '../RecipeCard/RecipeCard'

const GeneratedMenu = ({ menu }) => {

  if (!menu || !menu.weekMenu) {
    return <p>No hay menú disponible</p>
  }
  const { weekMenu } = menu

  return (
    <div className='menu-semanal'>
      {weekMenu.map((day, index) => (
        <div key={index} className='dia'>
          <h2>{day.day}</h2>
          <div className='meals-grid'>
            {day.meals.map((meal) => (
              <RecipeCard key={meal._id} recipe={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GeneratedMenu
