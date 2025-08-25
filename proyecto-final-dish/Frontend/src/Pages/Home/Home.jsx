import FormAPP from '../../Components/FormAPP/FormAPP'
import SomeRecipes from '../../Components/SomeRecipes/SomeRecipes'
import CarouselTestimonials from '../../Components/Testimonials/Testimonials'
import { AuthContext } from '../../Providers/AuthProvider'
import './Home.css'
import React, { useContext } from 'react'

const Home = () => {
  const { checkToken } = useContext(AuthContext)

  return (
    <div>
      <div className='flex'>
        <img src='/src/assets/rock.jpg' alt='Bienvenida' />
        <FormAPP
          message={
            'Inicia sesión o regístrate para disfrutar de todas nuestras ventajas'
          }
          reviewToken={checkToken}
        />
      </div>
      <SomeRecipes></SomeRecipes>
      <CarouselTestimonials></CarouselTestimonials>
    </div>
  )
}

export default Home
