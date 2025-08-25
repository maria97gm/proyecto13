import React, { useContext, useEffect, useState } from 'react'
import FormAPP from '../../Components/FormAPP/FormAPP'
import './CreateMenu.css'
import FormMenu from '../../Components/FormMenu/FormMenu'
import { AuthContext } from '../../Providers/AuthProvider'
import Loading from '../../Components/Loading/Loading'

const CreateMenu = () => {
  const { isAuth, checkToken } = useContext(AuthContext)

  if (isAuth === null) {
    return <Loading />
  }

  return isAuth ? (
    <FormMenu />
  ) : (
    <div className='create-menu'>
      <FormAPP
        message={'Necesitas iniciar sesión o registrarte para crear tu menú'}
        reviewToken={checkToken}
      />
    </div>
  )
}

export default CreateMenu
