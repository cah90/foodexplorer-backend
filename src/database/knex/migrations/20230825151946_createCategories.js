exports.up = function (knex) {
	return knex.schema
		.createTable("categories", (table) => {
			table.increments("id").notNullable()
			table.text("name")
		})
		.then(() =>
			knex("categories").insert([
				{ name: "Pratos Principais" },
				{ name: "Sobremesas" },
				{ name: "Bebidas" },
			])
		)
}

exports.down = function (knex) {
	return knex.schema.dropTable("categories")
}
