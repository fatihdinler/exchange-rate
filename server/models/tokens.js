const generalHook = require('../helper/store')

const name = 'Token'
const tableName = 'tokens'

const selectableProps = [
  'id',
  'user_id',
  'token',
  'type',
  'expires_at',
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



