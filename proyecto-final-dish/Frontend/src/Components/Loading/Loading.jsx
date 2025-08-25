import React, { useEffect, useState } from 'react'
import './Loading.css'

const Loading = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className='loading-wrapper'>
      <div className='loader'></div>
    </div>
  )
}

export default Loading
