const favoriteServices = require("../services/favorite-service")
const { createError, BAD_REQUEST } = require('../helper/error')
const moneyTypes = require('../money-types.json')

const getFavorite = async (req, res, next) => {
  const favorite = await favoriteServices.getFavoriteByUserId(req.params.userId)
  if (!favorite) {
    return next(createError({
      status: NOT_FOUND,
      message: "Favorite not found!",
    }))
  }
  res.send({ favorite })
}

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


const updateFavorite = async (req, res, next) => {
  const existFavorite = await userServices.getFavoriteByUserId(req.params.userId)
  const validationErrors = favoriteValidations(req)

  if (validationErrors.length > 0 || !existFavorite) {
    return next(createError({
      status: BAD_REQUEST,
      message: validationErrors || "Favorite not found!",
    }))
  }

  const updatedFavorite = await favoriteServices.updateFavorites(req.params.id, req.body.favorites)

  res.send(updatedFavorite)
}

const favoriteValidations = async (req, routeType) => {
  let validationErrors = []
  const existFavorite = await favoriteServices.getFavoriteByUserId(req.body.userId)

  if (req.body.userId && existFavorite?.user_id === req.body.userId) {
    validationErrors.push({ message: "User favorites already exists" })
  }

  if (req.body.favorites !== undefined && req.body.favorites.length > 0) {
    if (!Array.isArray(req.body.favorites)) {
      validationErrors.push({ message: "Favorites parameters must be array" })
    } else if (!Object.keys(moneyTypes.symbols).some(moneyType => req.body.favorites.includes(moneyType))) {
      validationErrors.push({ message: "Favorites parameters including moneyTypes symbols" })
    }
  }

  return validationErrors
}

module.exports = {
  getFavorite: getFavorite,
  getFavorites: getFavorites,
  createFavorite: createFavorite,
  updateFavorite: updateFavorite
}
