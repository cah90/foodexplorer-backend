const { Router } = require("express")
const multer = require("multer")
const uploadConfigs = require("../configs/upload")
const upload = multer(uploadConfigs.MULTER)

const DishesController = require("../controllers/DishesController")

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get("/", dishesController.showAll)
dishesRoutes.get("/:dishId", dishesController.show)
dishesRoutes.post("/", upload.single("image"), dishesController.create)

module.exports = dishesRoutes
