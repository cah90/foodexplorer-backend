const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

const knex = require("../database/knex")

class DishesController {
	async showAll(req, res) {
		const allDishes = await knex("dishes")
			.innerJoin("categories", "categories.id", "dishes.category_id")
			.select(
				"categories.name as category_name",
				"dishes.name as dishes_name",
				"dishes.description",
				"dishes.price",
				"dishes.image"
			)

		return res.json(allDishes)
	}

	async show(req, res) {
		const { dishId } = req.params

		const dish = await knex("dishes")
			.innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
			.select(
				"dishes.name as dishes_name",
				"dishes.description",
				"dishes.price",
				"dishes.image",
				knex.raw('GROUP_CONCAT(ingredients.name, ", ") as ingredients_name')
			)
			.where("dishes.id", dishId)

		return res.json(dish)
	}

	async create(req, res) {
		const { name, description, price, ingredients, category_id } = req.body

		const image = req.file.filename

		const diskStorage = new DiskStorage()

		const checkDishNameExists = await knex("dishes").where("name", name).first()

		if (checkDishNameExists) {
			throw new AppError("Este nome já está em uso.", 401)
		}

		const imageFilename = await diskStorage.saveFile(image)

		const [dish] = await knex("dishes").returning("id").insert({
			image: imageFilename,
			name,
			description,
			price,
			category_id,
		})

		const ingredientsInsert = ingredients.split(",").map((ingredient) => {
			return {
				name: ingredient,
				dish_id: dish.id,
			}
		})

		await knex("ingredients").insert(ingredientsInsert)

		return res.status(201).json()
	}
}

module.exports = DishesController
