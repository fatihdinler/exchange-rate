const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const userService = require('./user-service')
const { Token } = require('../models')
const constant = require('../helper/constant')

const {
  createError,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED
} = require('../helper/error')

const login = async (username, password) => {
  const user = await userService.getUserByUsername(username)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }
  return user
}

const checkAuthThenGenerateNewToken = async (token) => {
  try {
    const refreshToken = await tokenService.verifyToken(token, constant.tokenTypes.REFRESH)
    const user = await userService.getUserById(refreshToken.user_id)

    if (!user) {
      console.error("::::::::: User not found! ::::::::")
    }
    console.log("exprise oldu yeni token almaya geldi", user.firstname)

    return tokenService.generateAccessToken(user)
  } catch (error) {
    console.error(error, ":::::: checkAuthThenGenerateNewToken error! ::::::::")
  }
}

module.exports = { login, checkAuthThenGenerateNewToken }