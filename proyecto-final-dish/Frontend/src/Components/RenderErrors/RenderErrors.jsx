import React from 'react'

const RenderErrors = ({ field, errors }) => {
  return (
    errors[field] && (
      <p
        style={{
          fontWeight: '700',
          paddingBottom: '20px',
          textTransform: 'uppercase'
        }}
      >
        {errors[field].message}
      </p>
    )
  )
}

export default RenderErrors
