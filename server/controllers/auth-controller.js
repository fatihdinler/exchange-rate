const authService = require("../services/auth-service")
const tokenService = require("../services/token-service")

const {
  createError,
  BAD_REQUEST
} = require('../helper/error-helper')

const login = async (req, res, next) => {
  const { username, password } = req.body
  const user = await authService.login(username, password)
  if (!user) {
    return next(createError({
      status: BAD_REQUEST,
      message: '`username` + `password` are required fields'
    }))
  }
  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user, tokens })
}

module.exports = { login: login }