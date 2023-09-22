const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

const { compare } = require("bcryptjs")

class SessionsController {
	async create(req, res) {
		const { email, password } = req.body

		const user = await knex("users").where({ email }).first()

		if (!user) {
			throw new AppError("E-mail e/ou senha incorreta", 401)
		}

		const passwordMatched = await compare(password, user.password)

		if (!passwordMatched) {
			throw new AppError("E-mail e/ou senha incorreta", 401)
		}

		const { secret, expiresIn } = authConfig.jwt
		const token = sign({ role: user.role }, secret, {
			subject: String(user.id),
			expiresIn,
		})

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "Strict",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		})

		delete user.password

		return res.status(201).json({ user })
	}
}

module.exports = SessionsController
