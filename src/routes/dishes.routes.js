const { Router } = require("express")
const multer = require("multer")
const uploadConfigs = require("../configs/upload")
const upload = multer(uploadConfigs.MULTER)

const DishesController = require("../controllers/DishesController")

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.post("/", upload.single("image"), dishesController.create)

module.exports = dishesRoutes
