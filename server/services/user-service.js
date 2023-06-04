const bcrypt = require("bcrypt")
const { User } = require('../models')

const createUser = async (params) => {
  const { firstname, lastname, username, email, password } = params
  let createdUser = null
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  const user = {
    firstname,
    lastname,
    username,
    email,
    password: hash
  }
  const existUser = await User.findOne({ username: user.username })
  if (!existUser) {
    await User.create(user)
    createdUser = await User.findOne({ username: user.username })
  }

  return createdUser
}

const getAllUsers = async (filter, options) => {
  const users = await User.findAll()
  return users
}

const getUserById = async (id) => {
  return User.findOne({ id: id })
}

const getUserByUsername = async (username) => {
  return User.findOne({ username: username })
}

const getUserByEmail = async (email) => {
  return User.findOne({ email: email })
}

const updateUserById = async (userId, updateBody) => {
  const { firstname, lastname, username, email, password, language } = updateBody
  const user = {
    firstname,
    lastname,
    username,
    email,
    language,
  }
  if (password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    user.password = hash
  }

  const updatedUser = await User.update(userId, user)
  return updatedUser
}


const deleteUserById = async (userId) => {
  const user = await getUserById(userId)
  if (!user) return null
  await user.destroy()
  return user
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  getUserByEmail
}