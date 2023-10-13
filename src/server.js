require("express-async-errors")

require("dotenv/config")

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const AppError = require("./utils/AppError")

const routes = require("./routes/index.js")

const uploadConfig = require("./configs/upload")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://192.168.100.20:5173",
			"https://rocketseat-foodexplorer.netlify.app",
		],
		credentials: true,
	})
)

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

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

const PORT = process.env.SERVER_PORT || 3333

app.listen(PORT, () => console.log(`Uhull... Server is running ${PORT}`))
