const generalHook = require('../helper/store')
const name = 'User'
const tableName = 'users'
const selectableProps = [
  'id',
  'username',
  'password',
  'email',
  'firstname',
  'lastname',
  'language'
]

module.exports = knex => {
  const store = generalHook({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...store
  }
}
