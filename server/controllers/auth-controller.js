const authService = require("../services/auth-service")
const tokenService = require("../services/token-service")

const { createError, NOT_FOUND, BAD_REQUEST } = require('../helper/error')

const login = async (req, res, next) => {
  const { username, password } = req.body
  const user = await authService.login(username, password)
  if (!user) {
    return next(createError({
      status: BAD_REQUEST,
      message: 'User not found'
    }))
  }

  const tokens = await tokenService.findByRefreshTokenAndGenerateAccessToken(user)
  res.send({ user, tokens })
}

const refreshToken = async (req, res, next) => {
  const token = await authService.checkAuthThenGenerateNewToken(req.body.refreshToken)
  res.send({ ...token })
}




module.exports = {
  login: login,
  refreshToken: refreshToken,
}