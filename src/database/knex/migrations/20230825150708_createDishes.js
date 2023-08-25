exports.up = function (knex) {
	return knex.schema.createTable("dishes", (table) => {
		table.increments("id").notNullable()
		table.text("name")
		table.text("description")
		table.float("price")
		table.text("image")
		table.integer("category_id").references("id").inTable("categories")
		table.timestamp("created_at").default(knex.fn.now())
		table.timestamp("updated_at").default(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("dishes")
}
