import { useForm } from 'react-hook-form'
import './FormAPP.css'

import React, { useState } from 'react'
import { API } from '../../utils/API/API.JS'
import RenderErrors from '../RenderErrors/RenderErrors'
import { useNavigate } from 'react-router-dom'

const FormAPP = ({ message, reviewToken }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')

  const onSubmit = async (data, event) => {
    const submitter = event.nativeEvent.submitter
    setLoginError('')
    setRegisterError('')
    try {
      if (submitter.name === 'login') {
        const response = await API('/api/v1/users/login', 'POST', data)
        if (response === 'Usuario o contraseña incorrecto') {
          setLoginError(
            'Usuario o contraseña incorrecto. ¿Seguro que estás registrad@?'
          )
        } else {
          localStorage.setItem('token', response.token)
          if (reviewToken) await reviewToken()
          if (response.user?.rol === 'chef') {
            navigate('/control-panel')
          } else {
            navigate('/create-menu')
          }
        }
      } else if (submitter.name === 'register') {
        const response = await API('/api/v1/users/register', 'POST', data)
        const errorMsg =
          typeof response === 'string' ? response : response?.message

        if (errorMsg === 'Ya existe un usuario con ese nombre') {
          setRegisterError(errorMsg)
          return
        }

        if (!response?.token) {
          setRegisterError('Error inesperado en el registro')
          return
        }

        localStorage.setItem('token', response.token)
        if (reviewToken) {
          await reviewToken()
        }
        if (response.user?.rol === 'chef') {
          navigate('/control-panel')
        } else {
          navigate('/create-menu')
        }
      }
    } catch (error) {
      console.error(`Error en ${submitter.name}:`, error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{message}</h2>
        <input
          {...register('userName', {
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          })}
          type='text'
          placeholder='Usuario'
        />
        <RenderErrors field={'userName'} errors={errors} />
        <input
          {...register('password', {
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
            }
          })}
          type='password'
          placeholder='Contraseña'
        />
        <RenderErrors field={'password'} errors={errors} />
        {loginError && <p className='error-message'>{loginError}</p>}
        {registerError && <p className='error-message'>{registerError}</p>}

        <button type='submit' className='login' name='login'>
          Iniciar sesión
        </button>
        <button type='submit' name='register'>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default FormAPP
