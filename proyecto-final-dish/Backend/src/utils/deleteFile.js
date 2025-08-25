const cloudinary = require('cloudinary').v2

const deleteImgCloudinary = async (imgUrl) => {
  try {
    const array = imgUrl.split('/')
    const name = array.at(-1).split('.')[0]
    const public_id = `${array.at(-2)}/${name}`

    const result = await cloudinary.uploader.destroy(public_id)
    console.log('Imagen eliminada:', result)
  } catch (error) {
    console.error('Error al eliminar imagen de Cloudinary:', error)
  }
}

module.exports = { deleteImgCloudinary }
