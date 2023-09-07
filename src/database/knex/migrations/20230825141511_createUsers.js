exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").notNullable()
		table.text("name")
		table.text("email")
		table.text("password")

		table
			.enu("role", ["admin", "user"], {
				useNative: true,
				enumName: "roles",
			})
			.notNullable()
			.default("user")

		table.timestamp("created_at").default(knex.fn.now())
		table.timestamp("updated_at").default(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("users")
}
