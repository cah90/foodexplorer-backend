exports.up = function (knex) {
	return knex.schema.createTable("orders", (table) => {
		table.increments("id").notNullable()
		table.text("status")
		table.float("value")
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
		table.timestamp("created_at").default(knex.fn.now())
		table.timestamp("updated_at").default(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("orders")
}
