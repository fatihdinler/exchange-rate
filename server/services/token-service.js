const jwt = require('jsonwebtoken')
const moment = require('moment')
const { Token } = require('../models')
const jwtConfig = require('../helper/jwt-config')

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(jwtConfig.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires)
  await saveToken(accessToken, user.id, accessTokenExpires);

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  }
}

const generateToken = (userId, expires) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  }
  return jwt.sign(payload, jwtConfig.JWT_SECRET)
}

const saveToken = async (token, userId, expires) => {
  await Token.create({
    token,
    user_id: userId,
    expires_at: expires.toDate(),
  })
}

const verifyToken = async (token) => {
  const payload = jwt.verify(token, jwtConfig.JWT_SECRET)
  const tokenDoc = await Token.findOne({ token, user_id: payload.sub })
  if (!tokenDoc) return null
  return tokenDoc
}

module.exports = {
  generateToken,
  generateAuthTokens,
  verifyToken,
}