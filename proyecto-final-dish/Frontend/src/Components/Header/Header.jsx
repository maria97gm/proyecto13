import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProvider'
import Loading from '../Loading/Loading'
import Logout from '../Logout/Logout'
import './Header.css'

const Header = () => {
  const { isAuth, user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  if (isAuth === null) return <Loading />

  if (!isAuth) {
    return (
      <header>
        <Link to='/'>
          <img src='/src/assets/logo.png' alt='Logo' />
        </Link>

        <button
          className='hamburger'
          onClick={() => setOpen(!open)}
          aria-label='Abrir menú'
        >
          ☰
        </button>

        <nav className={open ? 'open' : ''}>
          <ul>
            <li>
              <Link to='/' onClick={() => setOpen(false)}>
                Inicio
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

  const chefLinks = (
    <>
      <li>
        <Link to='/control-panel' onClick={() => setOpen(false)}>
          Todas las recetas
        </Link>
      </li>
      <li>
        <Link to='/create-recipes' onClick={() => setOpen(false)}>
          Crear nuevas recetas
        </Link>
      </li>
      <li>
        <Link to='/collage' onClick={() => setOpen(false)}>
          El muro
        </Link>
      </li>
    </>
  )

  const userLinks = (
    <>
      <li>
        <Link to='/create-menu' onClick={() => setOpen(false)}>
          Crear menú
        </Link>
      </li>
      <li>
        <Link to='/my-menu' onClick={() => setOpen(false)}>
          Mi menú semanal
        </Link>
      </li>
      <li>
        <Link to='/my-favs' onClick={() => setOpen(false)}>
          Mis favoritos
        </Link>
      </li>
    </>
  )

  return (
    <header>
      <Link to='/'>
        <img src='/src/assets/logo.png' alt='Logo' />
      </Link>
      <button
        className='hamburger'
        onClick={() => setOpen(!open)}
        aria-label='Abrir menú'
      >
        ☰
      </button>

      <nav className={open ? 'open' : ''}>
        <ul>
          <li>
            <Link to='/' onClick={() => setOpen(false)}>
              Inicio
            </Link>
          </li>
          {user?.rol === 'chef' ? chefLinks : userLinks}
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
