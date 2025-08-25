import { useState, useCallback } from 'react'

export const useModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  const openModal = useCallback((msg) => {
    setMessage(msg)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setMessage('')
  }, [])

  return { showModal, message, openModal, closeModal }
}
