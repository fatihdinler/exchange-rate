const favoriteServices = require("../services/favorite-service")
const { createError, BAD_REQUEST } = require('../helper/error')
const moneyTypes = require('../money-types.json')

const getFavorites = async (req, res, next) => {
  const favorites = await favoriteServices.getAllFavorites()
  res.send({ favorites })
}

const createFavorite = async (req, res, next) => {
  const validationErrors = favoriteValidations(req)

  if (validationErrors.length > 0) return next(createError({ status: BAD_REQUEST, validationError: validationErrors }))

  const favorite = await favoriteServices.createFavorites(req.body)
  res.send({ favorite })
}


const favoriteValidations = async (req) => {
  let validationErrors = []
  const existFavorite = await favoriteServices.getUserById(req.body.userId)

  if (req.body.userId && existFavorite?.user_id === req.body.userId) {
    validationErrors.push({ message: "User favorites already exists" })
  }
  if (req.body.favorites !== undefined) {
    if (!Array.isArray(req.body.favorites)) {
      validationErrors.push({ message: "favorites parameters must be array" })
    } else if (!Object.keys(moneyTypes.symbols).some(moneyType => req.body.favorites.includes(moneyType))) {
      validationErrors.push({ message: "favorites parameters including moneyTypes symbols" })
    }
  }

  return validationErrors
}

module.exports = {
  getFavorites: getFavorites,
  createFavorite: createFavorite
}
