const generalHook = require('../helper/store')
const name = 'User'
const tableName = 'users'
const selectableProps = [
  'id',
  'username',
  'password',
  'email',
  'name',
  'lastname',
  'profilePicture',
  'biography',
  'followed'
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
