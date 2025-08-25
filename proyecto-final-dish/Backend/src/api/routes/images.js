const { isAuth } = require('../../middlewares/isAuth')
const { uploadRecipes, uploadRecipesByChef } = require('../../middlewares/file')

const {
  uploadImages,
  deleteImage,
  getImages
} = require('../controllers/images')

const imageRoutes = require('express').Router()

imageRoutes.post('/user', [isAuth, uploadRecipes.single('image')], uploadImages)
imageRoutes.post(
  '/chef',
  [isAuth, uploadRecipesByChef.single('image')],
  uploadImages
)

imageRoutes.delete('/:id', [isAuth], deleteImage)
imageRoutes.get('/collage', [isAuth], getImages)

module.exports = imageRoutes
