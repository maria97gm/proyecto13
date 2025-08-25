const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('✅ Conectados con la BBDD, seguimos')
  } catch (error) {
    console.error('❌ Error conectando con la BBDD:', error.message)
  }
}

module.exports = { connectDB }
