const Ingredient = require('../models/ingredients')
const Recipe = require('../models/recipes')
const Menu = require('../models/menus')

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const tagsMap = {
  'sin gluten': 'isGlutenFree',
  'sin lactosa': 'isLactosaFree',
  vegana: 'isVegan'
}

const getMenuPerWeek = async (req, res, next) => {
  try {
    const MEALS_PER_DAY = 3

    const { tags, goals } = req.body

    let recipesFilter

    if (tags.toLowerCase() === 'ninguna') {
      recipesFilter = await Recipe.find({ goals: goals }).populate(
        'ingredientIds'
      )
    } else {
      const tagsKey = tagsMap[tags.toLowerCase()]
      if (!tagsKey) {
        return res
          .status(400)
          .json('Restricción desconocida. Repite el proceso')
      }

      const badIngredientesFilter = {}
      badIngredientesFilter[tagsKey] = false

      const badIngredientesFilterIds = await Ingredient.find(
        badIngredientesFilter
      ).distinct('_id')

      recipesFilter = await Recipe.find({
        ingredientIds: { $nin: badIngredientesFilterIds },
        goals: goals
      }).populate('ingredientIds')

      if (recipesFilter.length === 0) {
        return res
          .status(404)
          .json('No hay recetas disponibles con esos criterios')
      }
    }
    const breakfastRecipes = recipesFilter.filter(
      (recipe) => recipe.type === 'breakfast'
    )
    const restRecipes = recipesFilter.filter(
      (recipe) => recipe.type !== 'breakfast'
    )

    const shuffledBreakfast = shuffleArray(breakfastRecipes)
    const shuffledRest = shuffleArray(restRecipes)

    let breakfastIndex = 0
    let restIndex = 0

    const weekMenu = []

    for (let day = 0; day < 7; day++) {
      const dayMenu = []

      if (breakfastIndex >= shuffledBreakfast.length) breakfastIndex = 0
      dayMenu.push(shuffledBreakfast[breakfastIndex])
      breakfastIndex++

      for (let meal = 1; meal < MEALS_PER_DAY; meal++) {
        if (restIndex >= shuffledRest.length) restIndex = 0
        dayMenu.push(shuffledRest[restIndex])
        restIndex++
      }

      weekMenu.push({
        day: `Día ${day + 1}`,
        meals: dayMenu
      })
    }

    return res.status(200).json({ weekMenu, mealsPerDay: MEALS_PER_DAY })
  } catch (error) {
    console.error('Error generando el menú:', error)
    return res.status(500).json('Error interno del servidor')
  }
}

const saveMenu = async (req, res, next) => {
  try {
    console.log('BODY recibido en saveMenu:', req.body)
    const userId = req.user.id
    const { meals, tags, goals, budget } = req.body

    const newMenu = new Menu({
      user: userId,
      meals,
      tags,
      goals,
      budget
    })

    const menuSaved = await newMenu.save()

    return res.status(201).json({ menuSaved })
  } catch (error) {
    return res.status(500).json({ message: 'Error al guardar el menú', error })
  }
}

const getMenuByUser = async (req, res, next) => {
  try {
    const userId = req.user.id
    const menu = await Menu.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'meals.recipes',
        model: 'recipes'
      })

    if (!menu) {
      return res
        .status(404)
        .json({ message: 'No se encontró menú para este usuario' })
    }

    return res.status(200).json(menu)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error al obtener el menú del usuario' })
  }
}

const getAllMenus = async (req, res, next) => {
  try {
    const userId = req.user.id

    const allMenus = await Menu.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'meals.recipes',
        model: 'recipes'
      })
    return res.status(200).json(allMenus)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al acceder al historial de menús' })
  }
}

const deleteMenu = async (req, res, next) => {
  const { id } = req.params
  try {
    const menuDeleted = await Menu.findByIdAndDelete(id)
    return res.status(200).json(menuDeleted)
  } catch (error) {
    return res.status(500).json('Error al intentar eliminar un menú')
  }
}

module.exports = {
  getMenuPerWeek,
  saveMenu,
  getMenuByUser,
  getAllMenus,
  deleteMenu
}
