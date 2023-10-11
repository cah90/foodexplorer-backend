const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

const knex = require("../database/knex")

class DishesController {
	async showAll(req, res) {
		const allDishes = await knex("dishes")
			.innerJoin("categories", "categories.id", "dishes.category_id")
			.select(
				"dishes.id as dishes_id",
				"dishes.name as dishes_name",
				"dishes.description",
				"dishes.price",
				"dishes.image",
				"dishes.category_id",
				"categories.id as category_id",
				"categories.name as category_name"
			)

		return res.json(allDishes)
	}

	async show(req, res) {
		const { dishId } = req.params

		const dish = await knex("dishes")
			.innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
			.select(
				"dishes.name as name",
				"dishes.description",
				"dishes.price",
				"dishes.image",
				knex.raw('GROUP_CONCAT(ingredients.name, ",") as ingredients')
			)
			.where("dishes.id", dishId)
			.first()

		const newIngredientsList = dish.ingredients.split(",")

		dish.ingredients = newIngredientsList

		return res.json(dish)
	}

	async create(req, res) {
		const { name, description, price, ingredients, category } = req.body

		const newCategoryId = Number(category)
		const newPrice = Number(price)

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
			price: newPrice,
			category_id: newCategoryId,
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

	async delete(req, res) {
		const { dishId } = req.params

		await knex("dishes").where("id", dishId).delete()

		return res.status(204).json()
	}

	async update(req, res) {
		const { dishId } = req.params
		const { name, description, price, ingredients, category } = req.body

		const image = req.file.filename

		const diskStorage = new DiskStorage()

		const dish = await knex("dishes").where({ id: dishId }).first()

		if (!dish) {
			throw new AppError("Esse prato não existe.", 401)
		}

		if (dish.image) {
			await diskStorage.deleteFile(dish.image)
		}

		const imageFilename = await diskStorage.saveFile(image)

		await knex("dishes")
			.where("id", dishId)
			.update({
				name: name,
				description: description,
				price: Number(price),
				category_id: Number(category),
				image: imageFilename,
			})

		const ingredientsUpdated = ingredients.split(",").map((ingredient) => {
			return {
				name: ingredient,
				dish_id: dish.id,
			}
		})

		await knex("ingredients").where("dish_id", dishId).delete()

		await knex("ingredients")
			.where("dish_id", dishId)
			.insert(ingredientsUpdated)

		return res.status(200).json()
	}
}

module.exports = DishesController
