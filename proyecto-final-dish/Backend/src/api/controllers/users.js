const { generateSign } = require('../../config/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName })
    if (userDuplicated) {
      return res.status(404).json('Ya existe un usuario con ese nombre')
    }
    const user = new User(req.body)
    const userSaved = await user.save()
    const token = generateSign(userSaved._id)

    return res.status(201).json({
      user: userSaved,
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })
    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrecto')
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ token, user })
    } else {
      return res.status(400).json('Usuario o contraseña incorrecto')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json({
      mensaje: 'Este usuario ha sido eliminado',
      userDeleted
    })
  } catch (error) {
    return res.status(400).json('No puedes eliminar al usuario')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(201).json(updatedUser)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getUserFavs = async (req, res, next) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).populate('favorites')

    if (!user) {
      return res.status(404).json('Usuario no encontrado')
    }

    if (!user.favorites || user.favorites.length === 0) {
      return res.status(200).json([])
    }

    return res.status(200).json({ recipes: user.favorites })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al obtener los favoritos del usuario' })
  }
}

const addFavs = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { recipeId } = req.params

    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: recipeId }
    })

    return res.status(200).json({ message: 'Receta añadida a favoritos' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al añadir a favoritos' })
  }
}

const removeFavs = async (req, res) => {
  try {
    const userId = req.user._id
    const { recipeId } = req.params

    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: recipeId }
    })

    return res.status(200).json({ message: 'Receta eliminada de favoritos' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al quitar de favoritos', error })
  }
}

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserFavs,
  addFavs,
  removeFavs
}
