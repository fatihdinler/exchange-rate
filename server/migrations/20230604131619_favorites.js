exports.up = function (knex) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.json('favorites').defaultTo(JSON.stringify([]));
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('favorites')
}
