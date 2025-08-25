import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../utils/API/api'
import { AuthContext } from '../../Providers/AuthProvider'
import './Collage.css'

const Collage = () => {
  const [images, setImages] = useState([])
  const { isAuth } = useContext(AuthContext)

  useEffect(() => {
    const fetchIimg = async () => {
      try {
        const response = await API(`/api/v1/images/collage`, 'GET', null, true)

        setImages(response)
      } catch (error) {
        console.error('Error en la petición', error)
      }
    }
    if (isAuth) {
      fetchIimg()
    }
  }, [isAuth])

  return (
    <>
      <h1>¿Encuentras tu fotito en el tablón?</h1>
      <div className='collage'>
        {images.map((image) => (
          <div key={image._id} className='image-card'>
            <div className='image-wrapper'>
              <img src={image.imageUrl} />
              <span className='camera'>📸 {image?.user?.userName}</span>
            </div>
            <div className='image-info'>
              <p className='comment'>{image.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Collage
