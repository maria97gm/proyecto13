import React from 'react'
import './Modal.css'

const Modal = ({ title, children, onClose }) => {
  return (
    <div className='overlay'>
      <div className='modal'>
        {title && <h2>{title}</h2>}
        <div className='modal-content'>{children}</div>
        {onClose && (
          <button className='modal-close' onClick={onClose}>
            Cerrar
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
