const { User } = require('../models')

const userServices = require("../services/user-service")

const signUp = async (req, res, next) => {
  const user = await userServices.createUser(req.body)
  if (user) {
    res.send({ user })
  }
  return next(createError({
    status: CONFLICT,
    message: "User already exists",
  }))
}


const getUsers = (req, res, next) => {
  User.findAll()
    .then(users => res.json({
      ok: true,
      message: 'Users found',
      users
    }))
    .catch(next)
}

const getUser = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
    .then(user => res.json({
      ok: true,
      message: 'User found',
      user
    }))
    .catch(next)
}

const putUser = (req, res, next) => {
  const userId = req.params.id
  const props = req.body.user

  User.update(userId, props)
    .then(user => res.json({
      ok: true,
      message: 'User updated',
      user
    }))
    .catch(next)
}

const deleteUser = (req, res, next) => {
  const userId = req.params.id

  User.destroy(userId)
    .then(deleteCount => res.json({
      ok: true,
      message: `User '${userId}' deleted`,
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  signUp: signUp
}