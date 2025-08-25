import Slider from 'react-slick'
import { testimonials } from '../../utils/TestimonialsArray/testimonials'
import React from 'react'
import './Testimonials.css'

const CarouselTestimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <div className='carousel'>
      <h2>¿Qué dicen de nosotros?</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <p>{testimonial.testimonial}</p>
            <h3>{testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselTestimonials
