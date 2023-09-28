const knex = require("../database/knex")

class SearchController {
	async index(req, res) {
		const { query } = req.query

		const result = await knex("dishes")
			.select(
				"dishes.id",
				"dishes.name",
				"dishes.description",
				"dishes.price",
				"dishes.image",
				knex.raw('GROUP_CONCAT(ingredients.name, ",") as ingredients')
			)
			.leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
			.where(function () {
				this.where("dishes.name", "like", `%${query}%`).orWhere(
					"ingredients.name",
					"like",
					`%${query}%`
				)
			})
			.groupBy("dishes.id")

		res.json(result)
	}
}

module.exports = SearchController
