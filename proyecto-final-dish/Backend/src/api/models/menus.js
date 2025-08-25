const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    meals: [
      {
        day: { type: String, required: true },
        recipes: [
          { type: mongoose.Types.ObjectId, ref: 'recipes', required: true }
        ]
      }
    ],
    tags: { type: String }, 
    goals: { type: String }, 
    budget: { type: String } 
  },
  { timestamps: true }
)

const Menu = mongoose.model('menus', menuSchema, 'menus')

module.exports = Menu
