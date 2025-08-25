const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ingredientIds: [{ type: mongoose.Types.ObjectId, ref: 'ingredients' }],
    preparation: [{ type: String, required: true }],
    tags: [{ type: String }],
    goals: [{ type: String }],
    type: { type: String }
  },
  { timestamps: true, collection: 'recipes' }
)

const Recipe = mongoose.model('recipes', recipeSchema, 'recipes')

module.exports = Recipe
