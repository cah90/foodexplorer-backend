exports.up = function (knex) {
	return knex.schema.createTable("categories", (table) => {
		table.increments("id").notNullable()
		table.text("name")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("categories")
}
