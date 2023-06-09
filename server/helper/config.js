require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES: parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES),
  JWT_REFRESH_EXPIRATION_YEARS: parseInt(process.env.JWT_REFRESH_EXPIRATION_YEARS),
  EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
  APPLICATION_PORT: process.env.APPLICATION_PORT
}