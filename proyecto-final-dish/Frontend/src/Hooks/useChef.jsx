import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider'

export const useChef = () => {
  const { isAuth, user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth !== null) {
      if (!isAuth || user?.rol !== 'chef') {
        navigate('/')
      }
    }
  }, [isAuth, user, navigate])

  return { isAuth, user, loading: isAuth === null }
}
