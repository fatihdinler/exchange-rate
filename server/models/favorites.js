const generalHook = require('../helper/store')
const name = 'Favorites'
const tableName = 'favorites'
const selectableProps = [
  'id',
  'user_id',
  'favorites',
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
