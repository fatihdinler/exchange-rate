exports.up = function (knex) {
  return knex.schema.createTable('exchange_rates', function (table) {
    table.increments('id').primary()
    table.json('meta')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('exchange_rates')
}
