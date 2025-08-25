require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const { parse } = require('csv-parse')
const Ingredient = require('../src/api/models/ingredients')
const Recipe = require('../src/api/models/recipes')

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const records = []
    fs.createReadStream(filePath, { encoding: 'utf-8' })
      .pipe(parse({ delimiter: ';', columns: true, trim: true }))
      .on('data', (record) => records.push(record))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err))
  })
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a MongoDB')

    await Ingredient.collection.drop()
    console.log('La colección ingredientes ha quedado vacía')

    await Recipe.collection.drop()
    console.log('La colección recetas ha quedado vacía')

    const ingredientsData = await readCSV('data/ingredients.csv')
    const recipesData = await readCSV('data/recipes.csv')

    const ingredients = ingredientsData.map((item) => ({
      csvId: item.id,
      name: item.name,
      unit: item.unit,
      isLactosaFree: item.isLactosaFree === 'true',
      isVegan: item.isVegan === 'true',
      isGlutenFree: item.isGlutenFree === 'true'
    }))

    const insertedIngredients = await Ingredient.insertMany(
      ingredients.map(({ csvId, ...rest }) => rest)
    )
    console.log(`Se han insertado ${insertedIngredients.length} ingredientes`)

    const ingredientsIdMap = {}
    ingredients.forEach((item, index) => {
      ingredientsIdMap[item.csvId] = insertedIngredients[index]._id
    })

    const recipes = recipesData.map((item) => ({
      name: item.name,
      description: item.description,
      image: item.image,
      ingredientIds: item.ingredientIds
        .split(';')
        .map((id) => ingredientsIdMap[id.trim()]),
      preparation: item.preparation.split('|'),
      tags: item.tags.split(';'),
      goals: item.goals.split(';'),
      type: item.type
    }))

    const insertedRecipes = await Recipe.insertMany(recipes)
    console.log(`Se han insertado ${insertedRecipes.length} recetas`)
  } catch (error) {
    console.error('Error insertando los datos de la semilla:', error)
  } finally {
    await mongoose.connection.close()
  }
}

seed()
