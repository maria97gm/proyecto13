import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../utils/API/api'
import GeneratedMenu from '../../Components/GeneratedMenu/GeneratedMenu'
import './History.css'
import { AuthContext } from '../../Providers/AuthProvider'
import Loading from '../../Components/Loading/Loading'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const [history, setHistory] = useState([])
  const [openIndex, setOpenIndex] = useState(null)
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const goalsLabels = {
    eat_healthy: 'Comer saludable',
    lose_weight: 'Bajar peso',
    gain_muscle: 'Ganar músculo'
  }
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API('/api/v1/menus/history', 'GET', null, true)
        setHistory(response)
      } catch (error) {
        console.error('Error en la petición', error)
      }
    }
    fetchHistory()
  }, [])

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('¿Estás seguro que quieres eliminar este menú?')) return

    try {
      await API(`/api/v1/menus/${id}`, 'DELETE', null, true)
      setHistory((prevHistory) => prevHistory.filter((menu) => menu._id !== id))
      setOpenIndex(null)
    } catch (error) {
      console.error('Error al eliminar el menú:', error)
      alert('No se pudo eliminar el menú. Intenta de nuevo.')
    }
  }

  if (isAuth === null) return <Loading />
  if (isAuth === false) {
    navigate('/')
  }
  return (
    <div className='history'>
      <h1>Historial de menús</h1>
      {history.length === 0 && <p>No hay menús guardados.</p>}

      {history.map((menu, i) => (
        <div className='recuadro' key={menu._id}>
          <h3 onClick={() => toggleMenu(i)} style={{ cursor: 'pointer' }}>
            Menú {i + 1} - {new Date(menu.createdAt).toLocaleString()}
            {openIndex === i ? '▼' : '▶'}
          </h3>
          <p>Restricción: {menu.tags}</p>
          <p>Objetivo: {goalsLabels[menu.goals]}</p>
          <p>Presupuesto: {menu.budget}</p>
          {openIndex === i && (
            <GeneratedMenu
              menu={{
                weekMenu: menu.meals.map((day) => ({
                  day: day.day,
                  meals: day.recipes
                }))
              }}
            />
          )}
          <button onClick={() => handleDeleteMenu(menu._id)}>
            Eliminar menú del historial
          </button>
        </div>
      ))}
    </div>
  )
}

export default History
