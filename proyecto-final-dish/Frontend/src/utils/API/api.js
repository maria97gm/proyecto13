export const API = async (
  endpoint,
  method = 'GET',
  body = null,
  requiresToken = false
) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (requiresToken) {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await fetch(`proyecto13-omega.vercel.app${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })
         // http://localhost:3000${endpoint}


    const data = await response.json().catch(() => null)

    return data
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}
