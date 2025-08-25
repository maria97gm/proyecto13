const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    isLactosaFree: { type: Boolean, required: true },
    isVegan: { type: Boolean, required: true },
    isGlutenFree: { type: Boolean, required: true }
  },
  { timestamps: true, collection: 'ingredients' }
)

const Ingredient = mongoose.model(
  'ingredients',
  ingredientSchema,
  'ingredients'
)

module.exports=Ingredient
