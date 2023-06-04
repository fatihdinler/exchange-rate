exports.up = function (knex) {
  return knex.schema.createTable('tokens', function (table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.string('token').notNullable()
    table.string('type').notNullable()
    table.timestamp('expires_at').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tokens')
}