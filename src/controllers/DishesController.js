const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

const knex = require("../database/knex")

class DishesController {
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
