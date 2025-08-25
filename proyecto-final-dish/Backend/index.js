require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { connectDB } = require('./src/config/db')
const recipeRoutes = require('./src/api/routes/recipes')
const ingredientRoutes = require('./src/api/routes/ingredients')
const userRoutes = require('./src/api/routes/users')
const menusRoutes = require('./src/api/routes/menus')
const imageRoutes = require('./src/api/routes/images')
const { connectCloudinary } = require('./src/config/file')

const app = express()
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/ingredients', ingredientRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/menus', menusRoutes)
app.use('/api/v1/images', imageRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(3000, () => {
  console.log('Accede aquí:http://localhost:3000')
})
