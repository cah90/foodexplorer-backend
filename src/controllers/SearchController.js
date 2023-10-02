const knex = require("../database/knex")

class SearchController {
	async index(req, res) {
		const { query } = req.query

		const result = await knex("dishes")
			.select(
				"dishes.id",
				"dishes.name as dishes_name",
				"dishes.description",
				"dishes.price",
				"dishes.image",
				"categories.id as category_id",
				"categories.name as category_name",
				knex.raw('GROUP_CONCAT(ingredients.name, ",") as ingredients')
			)
			.innerJoin("categories", "categories.id", "dishes.category_id")
			.innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
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
