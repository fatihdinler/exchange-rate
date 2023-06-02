exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.string('email').notNullable()
    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.string('profilePicture')
    table.string('biography')
    table.timestamps(true, true);
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users')
}
