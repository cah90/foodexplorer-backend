exports.up = function (knex) {
	return knex.schema.createTable("ingredients", (table) => {
		table.increments("id").notNullable()
		table.text("name")
		table
			.integer("dish_id")
			.references("id")
			.inTable("dishes")
			.onDelete("CASCADE")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("ingredients")
}
