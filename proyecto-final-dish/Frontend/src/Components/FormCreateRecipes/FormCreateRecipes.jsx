import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import RenderErrors from '../RenderErrors/RenderErrors'
import { API } from '../../utils/API/API.JS'
import { APIFormData } from '../../utils/API/apiFormData'
import { useChef } from '../../Hooks/useChef'
import Loading from '../Loading/Loading'
import './FormCreateRecipes.css'
import { useModal } from '../../Hooks/useModal'
import Modal from '../Modal/Modal'

const FormCreateRecipes = () => {
  const { isAuth, user, loading } = useChef()
  const { showModal, openModal, closeModal } = useModal()

  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ingredientes: [{ ingrediente: null }],
      preparation: [{ descripcion: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredientes'
  })

  const {
    fields: preparationFields,
    append: appendPreparation,
    remove: removePreparation
  } = useFieldArray({
    control,
    name: 'preparation'
  })

  useEffect(() => {
    if (!loading && (!isAuth || user?.rol !== 'chef')) {
      navigate('/')
    }
  }, [loading, isAuth, user, navigate])

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await API('/api/v1/ingredients', 'GET')
        const mapIngredients = data.map((ingredient) => ({
          value: ingredient._id,
          label: ingredient.name
        }))
        setIngredients(mapIngredients)
      } catch (err) {
        console.error('Error cargando ingredientes')
      }
    }
    fetchIngredients()
  }, [])

  const onSubmit = async (data) => {
    if (!isAuth || user?.rol !== 'chef') {
      alert('Solo los chefs pueden crear recetas')
      return
    }

    setIsSubmitting(true)

    try {
      const ingredientesIds = data.ingredientes.map(
        (item) => item.ingrediente?.value
      )
      const preparationSteps = data.preparation.map((item) => item.descripcion)

      let imageUrl = ''
      if (image) {
        const formData = new FormData()
        formData.append('image', image)
        const response = await APIFormData(
          '/api/v1/images/chef',
          'POST',
          formData,
          true
        )

        imageUrl = response?.imageUrl || ''
      }

      const DATA_RECIPE = {
        name: data.name,
        description: data.description,
        tags: data.tags,
        goals: data.goals,
        ingredientIds: ingredientesIds,
        preparation: preparationSteps,
        image: imageUrl,
        type: data.isBreakfast === 'true' ? 'breakfast' : ''
      }

      await API('/api/v1/recipes', 'POST', DATA_RECIPE, true)
      openModal('Receta creada con éxito ')
    } catch (err) {
      console.error('Error creando receta', err)
      openModal('No se pudo crear la receta')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || isSubmitting) return <Loading />

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Nombre de la receta *</label>
        <input
          id='name'
          type='text'
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        <RenderErrors field={'name'} errors={errors} />

        <label htmlFor='description'>Breve descripción *</label>
        <textarea
          id='description'
          {...register('description', {
            required: 'La descripción es obligatoria'
          })}
        />
        <RenderErrors field={'description'} errors={errors} />

        <label htmlFor='tags'>Restricciones alimentarias *</label>
        <select
          id='tags'
          multiple
          {...register('tags', { required: 'Selecciona al menos una opción' })}
        >
          <option value='ninguna'>Ninguna</option>
          <option value='sin lactosa'>Sin lactosa</option>
          <option value='sin gluten'>Sin gluten</option>
          <option value='vegana'>Vegana</option>
        </select>
        <RenderErrors field={'tags'} errors={errors} />

        <label htmlFor='goals'>Objetivo(s) del menú *</label>
        <select
          id='goals'
          multiple
          {...register('goals', {
            required: 'Selecciona al menos un objetivo'
          })}
        >
          <option value='lose_weight'>Bajar peso</option>
          <option value='gain_muscle'>Ganar músculo</option>
          <option value='eat_healthy'>Comer saludable</option>
        </select>
        <RenderErrors field={'goals'} errors={errors} />

        <label htmlFor='ingredients'>Elige los ingredientes *</label>
        <br />
        {fields.map((field, index) => {
          const selectedIds = fields.map((f, i) =>
            i !== index ? f.ingrediente?.value : null
          )

          const filteredOptions = ingredients.filter(
            (ing) =>
              !selectedIds.includes(ing.value) ||
              ing.value === field.ingrediente?.value
          )

          return (
            <div key={field.id}>
              <Controller
                control={control}
                name={`ingredientes.${index}.ingrediente`}
                rules={{ required: 'Selecciona un ingrediente' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={filteredOptions}
                    placeholder='Busca el ingrediente...'
                    isClearable
                  />
                )}
              />
              <button type='button' onClick={() => remove(index)}>
                Eliminar ingrediente
              </button>
              <RenderErrors
                field={`ingredientes.${index}.ingrediente`}
                errors={errors}
              />
            </div>
          )
        })}
        <button type='button' onClick={() => append({ ingrediente: null })}>
          Añade otro ingrediente
        </button>

        <br />
        <label htmlFor='preparation'>Preparación *</label>
        <br />
        {preparationFields.map((field, index) => (
          <div key={field.id}>
            <textarea
              {...register(`preparation.${index}.descripcion`, {
                required: 'Escribe la descripción del paso'
              })}
              placeholder={`Paso ${index + 1}`}
            />
            <button type='button' onClick={() => removePreparation(index)}>
              Eliminar paso
            </button>
            <RenderErrors
              field={`pasos.${index}.descripcion`}
              errors={errors}
            />
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendPreparation({ descripcion: '' })}
        >
          Añadir otro paso
        </button>

        <br />
        <label htmlFor='isBreakfast'>¿Esta receta es un desayuno ?*</label>
        <div className='radio-group'>
          <label>
            <input
              type='radio'
              value='true'
              {...register('isBreakfast', { required: true })}
            />
            Sí
          </label>
          <label>
            <input
              type='radio'
              value='false'
              {...register('isBreakfast', { required: true })}
            />
            No
          </label>
        </div>
        <br />
        <label htmlFor='image'>Imagen de la receta *</label>
        <input
          id='image'
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />
        <button type='submit'>Crear receta</button>
      </form>

      {showModal && (
        <Modal title='Receta creada' onClose={closeModal}>
          <button onClick={() => navigate(`/control-panel`)}>
            Ver todas las recetas
          </button>
        </Modal>
      )}
    </>
  )
}

export default FormCreateRecipes
