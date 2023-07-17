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

  const findOne = filters => knex.select(selectableCollectionField)
    .from(tableName)
    .where(filters)
    .first()

  const lastTwoRow = (column, optinalSorting) => knex.select(selectableCollectionField)
    .from(tableName)
    .orderBy(column, optinalSorting)
    .limit(2);

  const findById = id => knex.select(selectableCollectionField)
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const update = (id, props) => {
    delete props.id

    return knex
      .where({ id })
      .update(props)
      .from(tableName)
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
    destroy,
    lastTwoRow
  }
}