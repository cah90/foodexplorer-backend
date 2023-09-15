require("express-async-errors")

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const AppError = require("./utils/AppError")

const routes = require("./routes/index.js")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: ["http://192.168.100.20:5173"],
		credentials: true,
	})
)

app.use(routes)
app.use((error, req, res, next) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		})
	}

	console.error(error)

	return res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	})
})

const PORT = 3333

app.listen(PORT, () => console.log(`Uhull... Server is running ${PORT}`))
