const { Router } = require("express")
const multer = require("multer")
const uploadConfigs = require("../configs/upload")
const upload = multer(uploadConfigs.MULTER)

const DishesController = require("../controllers/DishesController")

const dishesRoutes = Router()
const dishesController = new DishesController()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization.js")

dishesRoutes.use(ensureAuthenticated)
// dishesRoutes.use(verifyUserAuthorization("admin"))

dishesRoutes.get("/", dishesController.showAll)
dishesRoutes.get("/:dishId", dishesController.show)
dishesRoutes.post(
	"/",
	verifyUserAuthorization("admin"),
	upload.single("image"),
	dishesController.create
)
dishesRoutes.delete(
	"/:dishId",
	verifyUserAuthorization("admin"),
	dishesController.delete
)
dishesRoutes.put(
	"/:dishId",
	verifyUserAuthorization("admin"),
	upload.single("image"),
	dishesController.update
)

module.exports = dishesRoutes
