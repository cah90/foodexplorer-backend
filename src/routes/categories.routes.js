const { Router } = require("express")

const categoriesRoutes = Router()

const CategoriesController = require("../controllers/CategoriesController")

const categoriesController = new CategoriesController()

categoriesRoutes.get("/", categoriesController.showAll)

module.exports = categoriesRoutes
