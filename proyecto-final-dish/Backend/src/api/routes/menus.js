const { isAuth } = require('../../middlewares/isAuth')
const {
  getMenuPerWeek,
  getMenuByUser,
  saveMenu,
  getAllMenus,
  deleteMenu
} = require('../controllers/menus')

const menuRoutes = require('express').Router()

menuRoutes.post('/get-menu', [isAuth], getMenuPerWeek)
menuRoutes.post('/save-menu', [isAuth], saveMenu)
menuRoutes.get('/get-user-menu', [isAuth], getMenuByUser)
menuRoutes.get('/history', [isAuth], getAllMenus)
menuRoutes.delete('/:id', [isAuth], deleteMenu)

module.exports = menuRoutes
