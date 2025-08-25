const { isAuth } = require('../../middlewares/isAuth')
const { isChef } = require('../../middlewares/isChef')
const {
  getIngredient,
  postIngredient,
  deleteIngredient,
  updateIngredient
} = require('../controllers/ingredients')

const ingredientRoutes = require('express').Router()

ingredientRoutes.get('/', getIngredient)
ingredientRoutes.post('/', [isAuth, isChef], postIngredient)
ingredientRoutes.delete('/:id', [isAuth, isChef], deleteIngredient)
ingredientRoutes.put('/:id', [isAuth, isChef], updateIngredient)

module.exports = ingredientRoutes
