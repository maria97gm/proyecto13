const Ingredient = require('../models/ingredients')

const getIngredient = async (req, res, next) => {
  try {
    const allIngredients = await Ingredient.find().sort({ name: 1 })
    return res.status(200).json(allIngredients)
  } catch (error) {
    console.error('Error al obtener ingredientes:', error)
    res.status(404).json('No hemos podido acceder a los ingredientes')
  }
}

const postIngredient = async (req, res, next) => {
  try {
    const newIngredient = new Ingredient(req.body)
    const ingredientSaved = await newIngredient.save()
    return res.status(201).json(ingredientSaved)
  } catch (error) {
    return res
      .status(404)
      .json('No hemos podido crear tu ingrediente, inténtalo de nuevo')
  }
}

const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params
    const ingredientDeleted = await Ingredient.findByIdAndDelete(id)
    return res.status(200).json(ingredientDeleted)
  } catch (error) {
    return res
      .status(404)
      .json('No hems podido eliminar tu ingrediente, inténtalo de nuevo ')
  }
}

const updateIngredient = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const updatengredient = await Ingredient.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(updatengredient)
  } catch (error) {
    return res
      .status(404)
      .json('No hemos podido actualizar tu ingrediente, inténtalo de nuevo')
  }
}

module.exports = {
  postIngredient,
  deleteIngredient,
  getIngredient,
  updateIngredient
}
