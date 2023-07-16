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

const getUserById = async (id) => {
  return Favorites.findOne({ user_id: id })
}

const getAllFavorites = async () => {
  return Favorites.findAll()
}


// const updateFavorites = async (userId, updateBody) => {
//   const { firstname, lastname, username, email, password, language } = updateBody
//   const user = {
//     firstname,
//     lastname,
//     username,
//     email,
//     language,
//   }
//   if (password) {
//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(password, salt)
//     user.password = hash
//   }

//   const updatedUser = await User.update(userId, user)
//   return updatedUser
// }

module.exports = {
  createFavorites,
  getUserById,
  getAllFavorites
}