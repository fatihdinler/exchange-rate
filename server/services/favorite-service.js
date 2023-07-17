const { Favorites } = require('../models')

const createFavorites = async (params) => {
  const { moneyTypes, userId } = params
  let createdFavorites = null

  const body = {
    favorites: moneyTypes,
    user_id: userId
  }
  const existUserByFavorites = await User.findOne({ user_id: user.user_id })

  if (!existUserByFavorites) {
    await Favorites.create(body)
    createdFavorites = await Favorites.findOne({ user_id: existUserByFavorites.user_id })
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
  await Favorites.update(userId, favorites)
  const updatedFavoriteByUser = await getFavoriteByUserId(userId)
  return updatedFavoriteByUser
}

// const deleteFavoriteByUserId = async (userId) => {
//   const favorite = await getFavoriteByUserId(userId)
//   if (!favorite) return null
//   await favorite.destroy()
//   return favorite
// }


module.exports = {
  createFavorites,
  getFavoriteByUserId,
  getAllFavorites,
  updateFavorites,
  deleteFavoriteByUserId
}