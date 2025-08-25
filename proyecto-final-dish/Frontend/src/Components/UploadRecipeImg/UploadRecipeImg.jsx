import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIFormData } from '../../utils/API/apiFormData'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'
import { useModal } from '../../Hooks/useModal'

const UploadRecipeImage = ({ recipeId }) => {
  const [comment, setComment] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { showModal, message, openModal, closeModal } = useModal() 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('image', image)
    formData.append('recipe', recipeId)
    formData.append('comment', comment)

    try {
      await APIFormData('/api/v1/images/user', 'POST', formData, true)
      setComment('')
      setImage(null)
      openModal('Imagen subida correctamente')
    } catch (err) {
      console.error('Error al subir la imagen', err)
      openModal('No se pudo subir la imagen')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>¡Sube tu foto! *</p>

        <input
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <textarea
          placeholder='¿Qué nombre le pones a tu receta?'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type='submit'>Subir imagen</button>
        <button type='button' onClick={() => navigate('/collage')}>
          Ver Collage
        </button>
      </form>

      {showModal && (
        <Modal title='Imagen subida' onClose={closeModal}>
          <button onClick={() => navigate('/collage')}>
            Ver el tablón de imágenes
          </button>
        </Modal>
      )}
    </>
  )
}

export default UploadRecipeImage
