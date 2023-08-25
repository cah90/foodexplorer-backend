exports.up = function (knex) {
	return knex.schema.createTable("ordered_dishes", (table) => {
		table.increments("id").notNullable()
		table.integer("dish_id").references("id").inTable("dishes")
		table
			.integer("order_id")
			.references("id")
			.inTable("orders")
			.onDelete("CASCADE")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("ordered_dishes")
}
