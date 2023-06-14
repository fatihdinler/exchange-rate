const generalHook = require('../helper/store')
const name = 'ExchangeRates'
const tableName = 'exchange_rates'
const selectableProps = [
  'id',
  'meta',
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
