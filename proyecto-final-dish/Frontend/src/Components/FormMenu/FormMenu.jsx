import React, { useState } from 'react'
import './FormMenu.css'
import { useForm } from 'react-hook-form'
import RenderErrors from '../RenderErrors/RenderErrors'
import { API } from '../../utils/API/api.js'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const FormMenu = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await API('/api/v1/menus/get-menu', 'POST', data, true)
      localStorage.setItem('myMenu', JSON.stringify(response))

      const simplifiedMenu = response.weekMenu.map((day) => ({
        day: day.day,
        recipes: day.meals.map((recipe) => recipe._id)
      }))

      await API(
        '/api/v1/menus/save-menu',
        'POST',
        {
          meals: simplifiedMenu,
          tags: data.tags,
          goals: data.goals,
          budget: data.budget
        },
        true
      )

      navigate('/my-menu')
    } catch (error) {
      console.error('Error en la petición:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading /> 
  }

  return (
    <>
      <div className='flex form-menu'>
        <img src='/assets/rock2.jpg' alt='Generar menú' />
        <h2>
          Rellena el formulario que se encuentra más abajo para obtener tu menú
          semanal.
          <br /> <br />
          Responde sinceramente y sin compromiso.
          <br /> <br />
          Estamos aquí para ayudarte.
        </h2>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>Nombre *</label>
          <input
            id='nombre'
            type='text'
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          <RenderErrors field={'name'} errors={errors} />

          <label htmlFor='tags'>
            ¿Tienes alguna restricción alimentaria? *
          </label>
          <select
            id='tags'
            {...register('tags', { required: 'Selecciona una opción' })}
            defaultValue=''
          >
            <option value='' disabled>
              -- Selecciona una opción --
            </option>
            <option value='ninguna'>Ninguna</option>
            <option value='sin lactosa'>Sin lactosa</option>
            <option value='sin gluten'>Sin gluten</option>
            <option value='vegana'>Vegano</option>
          </select>
          <RenderErrors field={'tags'} errors={errors} />

          <label htmlFor='goals'>¿Tienes algún objetivo específico? *</label>
          <select
            id='goals'
            {...register('goals', { required: 'Selecciona un objetivo' })}
            defaultValue=''
          >
            <option value='' disabled>
              -- Selecciona una opción --
            </option>
            <option value='lose_weight'>Bajar peso</option>
            <option value='gain_muscle'>Ganar músculo</option>
            <option value='eat_healthy'>Comer saludable</option>
          </select>
          <RenderErrors field={'goals'} errors={errors} />

          <label htmlFor='budget'>¿Cuál es tu presupuesto aproximado? *</label>
          <select
            id='budget'
            {...register('budget', { required: 'Selecciona un presupuesto' })}
            defaultValue=''
          >
            <option value='' disabled>
              -- Selecciona una opción --
            </option>
            <option value='bajo'>Bajo</option>
            <option value='medio'>Medio</option>
            <option value='alto'>Alto</option>
          </select>
          <RenderErrors field={'budget'} errors={errors} />

          <button type='submit'>Generar menú</button>
        </form>
      </div>
    </>
  )
}

export default FormMenu
