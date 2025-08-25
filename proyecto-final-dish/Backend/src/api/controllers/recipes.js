const Recipe = require('../models/recipes')

const getRecipe = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find()
      .populate('ingredientIds')
      .sort({ createdAt: -1 })
    return res.status(200).json(allRecipes)
  } catch (error) {
    console.error('Error al obtener recetas:', error.message)
    res.status(404).json('No hemos podido acceder a las recetas')
  }
}

const getRecipeId = async (req, res, next) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id).populate('ingredientIds')
    return res.status(200).json(recipe)
  } catch (error) {
    console.error('Error al obtener la receta:', error)
    res.status(404).json('No hemos podido acceder a la receta')
  }
}

const getFilteredRecipes = async (req, res) => {
  try {
    const { tags, goals } = req.query
    const filter = {}

    if (tags) {
      filter.tags = { $in: tags.split(',') }
    }

    if (goals) {
      filter.goals = { $in: goals.split(',') }
    }

    const recipes = await Recipe.find(filter)
    return res.status(200).json(recipes)
  } catch (error) {
    return res.status(500).json({ message: 'Error filtrando recetas' })
  }
}

const postRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body)
    const recipeSaved = await newRecipe.save()
    return res.status(201).json(recipeSaved)
  } catch (error) {
    return res
      .status(404)
      .json('No hemos podido crear tu receta, inténtalo de nuevo')
  }
}

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const recipeDeleted = await Recipe.findByIdAndDelete(id)
    return res.status(200).json(recipeDeleted)
  } catch (error) {
    return res
      .status(404)
      .json('No hems podido eliminar tu receta, inténtalo de nuevo ')
  }
}

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const updateRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(updateRecipe)
  } catch (error) {
    return res
      .status(404)
      .json('No hemos podido actualizar tu receta, inténtalo de nuevo')
  }
}

module.exports = {
  postRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipeId,
  getFilteredRecipes
}
