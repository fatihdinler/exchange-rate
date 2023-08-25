const { Favorites } = require('../models')

const createFavorites = async (params) => {
  const { favorites, userId } = params
  let createdFavorites = null

  const body = {
    favorites: JSON.stringify(favorites),
    user_id: userId
  }
  const existUserByFavorites = await Favorites.findOne({ user_id: body.user_id })

  if (!existUserByFavorites) {
    await Favorites.create(body)
    createdFavorites = await Favorites.findOne({ user_id: userId })
  }
  return createdFavorites
}

const getFavoriteByUserId = async (userId) => {
  return Favorites.findOne({ user_id: userId })
}

const getAllFavorites = async () => {
  return Favorites.findAll()
}

const updateFavorites = async (userId, favorites) => {

  await Favorites.update(userId, { favorites: JSON.stringify(favorites) })
  const updatedFavoriteByUser = await getFavoriteByUserId(userId)
  return updatedFavoriteByUser
}



module.exports = {
  createFavorites,
  getFavoriteByUserId,
  getAllFavorites,
  updateFavorites
}