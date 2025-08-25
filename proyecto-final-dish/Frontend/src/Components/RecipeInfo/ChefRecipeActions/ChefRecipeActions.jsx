import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../utils/API/api'
import './ChefRecipeActions.css'
import Modal from '../../Modal/Modal'

const ChefRecipeActions = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [deleted, setDeleted] = useState(false)

  const deleteRecipe = async () => {
    try {
      await API(`/api/v1/recipes/${id}`, 'DELETE', null, true)
      setDeleted(true)
    } catch (error) {
      console.error('Error al eliminar la receta', error)
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/control-panel')}>
        Volver al panel de control
      </button>
      <button onClick={deleteRecipe}>Eliminar receta</button>
      {deleted && (
        <Modal title='Receta eliminada'>
          <button onClick={() => navigate('/control-panel')}>
            Volver al panel de control
          </button>
        </Modal>
      )}
    </div>
  )
}

export default ChefRecipeActions
