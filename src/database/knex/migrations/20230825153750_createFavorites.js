exports.up = function (knex) {
	return knex.schema.createTable("favorites", (table) => {
		table.increments("id").notNullable()
		table
			.integer("dish_id")
			.references("id")
			.inTable("dishes")
			.onDelete("CASCADE")
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("favorites")
}
