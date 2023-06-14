const rateService = require("../services/rate-service")
const { createError, NOT_FOUND } = require('../helper/error')

const getLastRate = async (req, res, next) => {
  console.log("girdi ")
  const lastRate = await rateService.compareLastTwoRow()

  if (!lastRate) {
    return next(createError({
      status: NOT_FOUND,
      message: "Rate not found!",
    }))
  }
  res.send(lastRate)
}

module.exports = { getLastRate: getLastRate }