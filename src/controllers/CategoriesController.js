const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class CategoriesController {
	async showAll(req, res) {
		const allCategories = await knex("categories")

		return res.json(allCategories)
	}
}

module.exports = CategoriesController
