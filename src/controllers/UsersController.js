const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

const knex = require("../database/knex")

class UsersController {
	async create(req, res) {
		const { name, email, password } = req.body

		if (password.length < 6) {
			throw new AppError("A senha deve conter, no mínimo, 6 caracteres.")
		}

		const checkUserExist = await knex("users").where("email", email)

		if (checkUserExist.length > 0) {
			throw new AppError("Este e-mail já está em uso.")
		}

		const hashedPassword = await hash(password, 8)

		await knex("users").insert({
			name,
			email,
			password: hashedPassword,
		})

		return res.status(201).json()
	}
}

module.exports = UsersController
