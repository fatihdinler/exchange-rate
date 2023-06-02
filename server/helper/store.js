module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'tablename',
  selectableCollectionField = [],
  timeout = 1000
}) => {

  const create = props => {
    delete props.id
    return knex.insert(props)
      .returning(selectableCollectionField)
      .into(tableName)
      .timeout(timeout)
  }

  const findAll = () => knex.select(selectableCollectionField)
    .from(tableName)
    .timeout(timeout)

  const find = (filters) => knex.select(selectableCollectionField)
    .from(tableName)
    .where(filters)
    .timeout(timeout)

  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) {
        return results
      }
      return results[0]
    })

  const findById = id => knex.select(selectableCollectionField)
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const update = (id, props) => {
    delete props.id

    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableCollectionField)
      .timeout(timeout)
  }

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  return {
    name,
    tableName,
    selectableCollectionField,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy
  }
}