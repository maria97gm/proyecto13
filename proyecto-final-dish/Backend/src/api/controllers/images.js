const { deleteImgCloudinary } = require('../../utils/deleteFile')
const Images = require('../models/images')

const uploadImages = async (req, res, next) => {
  try {
    const newImage = new Images({
      recipe: req.body.recipe,
      user: req.user._id,
      imageUrl: req.file ? req.file.path : '',
      comment: req.body.comment || '',
      type: req.url.includes('/chef') ? 'chef' : 'user'
    })

    const imageSaved = await newImage.save()
    return res.status(201).json(imageSaved)
  } catch (error) {
    console.error(error)
    return res.status(500).json('No se ha podido publicar tu imagen')
  }
}

const deleteImage = async (req, res, next) => {
  const { id } = req.params
  try {
    const imageDeleted = await Images.findByIdAndDelete(id)

    if (!imageDeleted) {
      return res.status(404).json('Imagen no encontrada')
    }

    await deleteImgCloudinary(imageDeleted.imageUrl)

    return res.status(200).json(imageDeleted)
  } catch (error) {
    console.error(error)
    return res.status(400).json('No se ha podido eliminar la imagen')
  }
}

const getImages = async (req, res, next) => {
  try {
    const allImages = await Images.find({ type: 'user' }).populate(
      'user',
      'userName'
    )
    return res.status(200).json(allImages)
  } catch (error) {
    console.error(error)
    return res.status(400).json('No se ha podido accedera todas las imágenes')
  }
}

module.exports = { uploadImages, deleteImage, getImages }
