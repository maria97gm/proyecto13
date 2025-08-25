const { isAuth } = require('../../middlewares/isAuth')
const {
  getUsers,
  deleteUser,
  updateUser,
  register,
  login,
  addFavs,
  getUserFavs,
  removeFavs,
  getFilteredRecipes
} = require('../controllers/users')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/', [isAuth], getUsers)
userRoutes.get('/favorites', [isAuth], getUserFavs)
userRoutes.delete('/:id', [isAuth], deleteUser)
userRoutes.delete('/favorites/:recipeId', [isAuth], removeFavs)
userRoutes.put('/:id', [isAuth], updateUser)
userRoutes.put('/favorites/:recipeId', [isAuth], addFavs)

userRoutes.get('/verify-token', [isAuth], (req, res) => {
  res.status(200).json({ message: 'Token válido', user: req.user })
})

module.exports = userRoutes
