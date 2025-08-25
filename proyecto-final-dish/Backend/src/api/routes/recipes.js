const { isAuth } = require('../../middlewares/isAuth')
const { isChef } = require('../../middlewares/isChef')
const {
  getRecipe,
  postRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipeId,
  getFilteredRecipes
} = require('../controllers/recipes')

const recipeRoutes = require('express').Router()

recipeRoutes.get('/', getRecipe)
recipeRoutes.get('/:id', [isAuth], getRecipeId)
recipeRoutes.get('/filter', [isAuth, isChef], getFilteredRecipes)

recipeRoutes.post('/', [isAuth, isChef], postRecipe)
recipeRoutes.delete('/:id', [isAuth, isChef], deleteRecipe)
recipeRoutes.put('/:id', [isAuth, isChef], updateRecipe)

module.exports = recipeRoutes
