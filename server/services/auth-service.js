const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const userService = require('./user-service')
const { Token } = require('../models')

const login = async (username, password) => {
  // const user = await userService.getUserByUsername(username)
  let user = { username: username, password: password }
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }
  return user
}

module.exports = { login }