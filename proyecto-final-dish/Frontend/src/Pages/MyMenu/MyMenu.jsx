import React, { useContext, useEffect, useState } from 'react'
import './MyMenu.css'
import { useNavigate } from 'react-router-dom'
import GeneratedMenu from '../../Components/GeneratedMenu/GeneratedMenu'
import { AuthContext } from '../../Providers/AuthProvider'
import Loading from '../../Components/Loading/Loading'

const MyMenu = () => {
  const [menu, setMenu] = useState(null)
  const { isAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem('myMenu'))

    if (savedMenu) {
      setMenu(savedMenu)
    } else {
      navigate('/create-menu')
    }
  }, [navigate])

  useEffect(() => {
    if (isAuth === false) {
      navigate('/create-menu')
    }
  }, [isAuth, navigate])

  if (isAuth === null) return <Loading/>

  return (
    <div>
      <h1>Este es tu último menú semanal</h1>
      <button className='generate' onClick={() => navigate(`/create-menu`)}>
        Generar nuevo menú
      </button>
      <button className='generate' onClick={() => navigate(`/history`)}>
        Ver historial de mis menús
      </button>
      {menu && <GeneratedMenu menu={menu} />}
    </div>
  )
}

export default MyMenu
