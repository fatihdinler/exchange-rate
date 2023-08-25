const favoriteServices = require("../services/favorite-service")
const userServices = require("../services/user-service")
const { createError, BAD_REQUEST, NOT_FOUND } = require('../helper/error')
const moneyTypes = require('../money-types.json')
const ROUTE_TYPE = { CREATE: 'create', UPDATE: 'update' }
const getFavorite = async (req, res, next) => {
  const favorite = await favoriteServices.getFavoriteByUserId(req.params.id)
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
  const validationErrors = await favoriteValidations(req, ROUTE_TYPE.CREATE)
  const existUser = await userServices.getUserById(req.body.userId)

  if (validationErrors.length > 0 || !existUser) {
    return next(createError({
      status: !existUser ? NOT_FOUND : BAD_REQUEST,
      message: validationErrors || "User not found!",
    }))
  }

  const favorite = await favoriteServices.createFavorites(req.body)
  res.send({ favorite })
}


const updateFavorite = async (req, res, next) => {
  const existFavorite = await favoriteServices.getFavoriteByUserId(req.params.id)
  const existUser = existFavorite ? await userServices.getUserById(existFavorite.user_id) : null
  const validationErrors = await favoriteValidations(req)

  if (validationErrors.length > 0 || !existFavorite || !existUser) {
    return next(createError({
      status: !existFavorite || !existUser ? NOT_FOUND : BAD_REQUEST,
      message: validationErrors || !existUser ? "User not found!" : "Favorite not found",
    }))
  }

  const updatedFavorite = await favoriteServices.updateFavorites(req.params.id, req.body.favorites)

  res.send(updatedFavorite)
}

const favoriteValidations = async (req, routeType) => {
  let validationErrors = []

  if (routeType === ROUTE_TYPE.CREATE) {
    const existFavorite = await favoriteServices.getFavoriteByUserId(req.body.userId)
    if (req.body.userId && existFavorite?.user_id === parseInt(req.body.userId)) {
      validationErrors.push({ message: "User favorites already exists" })
    }
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
