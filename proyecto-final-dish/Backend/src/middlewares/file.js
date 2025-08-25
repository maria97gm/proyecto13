const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storageRecipes = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Recipes',
    allowedFormated: ['jpg', 'png', 'gif', 'jpeg', 'webp']
  }
})

const storageRecipesByChef = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'RecipesByChef',
    allowedFormated: ['jpg', 'png', 'gif', 'jpeg', 'webp']
  }
})

const uploadRecipes = multer({ storage: storageRecipes })
const uploadRecipesByChef = multer({ storage: storageRecipesByChef })

module.exports = { uploadRecipes, uploadRecipesByChef }
