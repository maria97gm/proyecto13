const isChef = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json('Acceso no autorizado. Debes autenticarte primero.')
  }
  if (req.user.rol === 'chef') {
    return next()
  }
  return res.status(403).json('No eres un chef autorizado')
}

module.exports = { isChef }
