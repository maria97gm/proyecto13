export const APIFormData = async (
  endpoint,
  method = 'POST',
  formData,
  requiresToken = false
) => {
  try {
    const headers = {}

    if (requiresToken) {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers,
      body: formData
    })

    const data = await response.json().catch(() => null)

    return data
  } catch (error) {
    console.error('Error en la API con FormData:', error)
    throw error
  }
}
