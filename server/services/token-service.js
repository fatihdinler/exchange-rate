const jwt = require('jsonwebtoken')
const moment = require('moment')
const { Token } = require('../models')
const config = require('../helper/config')
const constant = require('../helper/constant')

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_MINUTES, 'seconds')
  const accessToken = generateToken(user.id, accessTokenExpires, constant.tokenTypes.ACCESS)
  const refreshTokenExpires = moment().add(config.JWT_REFRESH_EXPIRATION_YEARS, 'years')
  const refreshToken = generateToken(user.id, refreshTokenExpires, constant.tokenTypes.REFRESH)

  await saveToken(refreshToken, user.id, refreshTokenExpires, constant.tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const findByRefreshTokenAndGenerateAccessToken = async (user) => {
  const newAccessToken = await generateAccessToken(user)
  const refreshToken = await Token.findOne({ user_id: user.id })
  console.log("login", newAccessToken)
  return {
    ...newAccessToken,
    refresh: {
      token: refreshToken.token,
      expires: refreshToken.expires_at,
    },
  }
}

const generateAccessToken = async (user) => {
  const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_MINUTES, 'seconds')
  const accessToken = generateToken(user.id, accessTokenExpires, constant.tokenTypes.ACCESS)
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    }
  }
}

const generateToken = (userId, expires, type) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }
  return jwt.sign(payload, config.JWT_SECRET)
}

const saveToken = async (token, userId, expires, type) => {
  await Token.create({
    token,
    user_id: userId,
    expires_at: expires.toDate(),
    type
  })
}

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.JWT_SECRET)
  const tokenDoc = await Token.findOne({ token, user_id: payload.sub })
  if (!tokenDoc) return null
  return tokenDoc
}


module.exports = {
  generateToken,
  generateAuthTokens,
  verifyToken,
  generateAccessToken,
  findByRefreshTokenAndGenerateAccessToken
}