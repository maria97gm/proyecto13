const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }],
    rol: {
      type: String,
      required: true,
      enum: ['chef', 'user'],
      default: 'user'
    },
    restrictions: [{ type: String }],
    goal: { type: String },
    budget: { type: String, enum: ['bajo', 'medio', 'alto'] }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = User
