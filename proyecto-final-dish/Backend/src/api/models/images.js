const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    recipe: { type: mongoose.Types.ObjectId, ref: 'recipes' },
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    imageUrl: { type: String, required: true },
    type: { type: String, enum: ['user', 'chef'], default: 'user' },
    comment: { type: String }
  },
  {
    timestamps: true,
    collection: 'images'
  }
)

const Images = mongoose.model('images', imageSchema, 'images')

module.exports = Images
