const { Router } = require("express")

const usersRouter = require("./users.routes.js")
const dishesRouter = require("./dishes.routes.js")
const sessionsRouter = require("./sessions.routes.js")
const categoriesRouter = require("./categories.routes.js")
const searchRouter = require("./search.routes.js")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/dishes", dishesRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/categories", categoriesRouter)
routes.use("/search", searchRouter)

module.exports = routes
