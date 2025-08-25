import React from 'react'
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='paginacion'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      <p>
        Página {currentPage} de {totalPages}
      </p>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
