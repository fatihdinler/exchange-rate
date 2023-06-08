const { User } = require('../models')
const userServices = require("../services/user-service")
const tokenService = require("../services/token-service")
const { createError, CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../helper/error')

const signUp = async (req, res, next) => {
  let error = []
  const existUser = await userServices.getUserByUsername(req.body.username) || await userServices.getUserByEmail(req.body.email)

  if (req.body.username && existUser?.username === req.body.username) {
    error.push('Username already exists')
  } else if (req.body.email && existUser?.email === req.body.email) {
    error.push('Email already exists')
  }

  if (error.length > 0) {
    return next(createError({
      status: BAD_REQUEST,
      message: error,
    }))
  }
  const user = await userServices.createUser(req.body)

  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user, tokens })
}

const getUser = async (req, res, next) => {
  console.log("girdi ")
  const user = await userServices.getUserById(req.params.id)

  if (!user) {
    console.log("user bulunamadı")
    return next(createError({
      status: NOT_FOUND, // TODOOOOOO
      message: "User not found!",
    }))
  }
  console.log("user bulundu")
  res.send({ user })


}

const updateUser = async (req, res, next) => {
  let error = []
  const existUser = await userServices.getUserById(req.params.id)

  if (req.body.username && existUser?.username === req.body.username) {
    error.push('Username already exists')
  } else if (req.body.email && existUser?.email === req.body.email) {
    error.push('Email already exists')
  }

  if (error.length > 0) {
    return next(createError({
      status: BAD_REQUEST,
      message: error,
    }))
  }

  const updatedUser = await userServices.updateUserById(req.params.id, req.body)
  if (!updatedUser) {
    return next(createError({
      status: NOT_FOUND,
      message: "User not found!",
    }))
  }
  res.send(await userServices.getUserById(req.params.id));
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
  signUp: signUp,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
}