exports.up = async knex => {
  await knex.schema.createTable('cars', table => {
    table.increments().unsigned()
    table.string('vin', 17).unique('vin').notNullable()
    table.string('make', 128).notNullable()
    table.string('model', 128).notNullable()
    table.integer('mileage').notNullable()
    table.string('title').nullable()
    table.string('transmission').nullable()
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('cars')
}
