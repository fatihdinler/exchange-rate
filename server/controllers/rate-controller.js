const rateService = require("../services/rate-service")
const { createError, NOT_FOUND } = require('../helper/error')

const getLastRate = async (req, res, next) => {
  const lastRate = await rateService.compareLastTwoRow()

  if (!lastRate) {
    return next(createError({
      status: NOT_FOUND,
      message: "Rate not found!",
    }))
  }
  res.send(lastRate)
}

const moneyConverter = async (req, res, next) => { // TODO bu kısım için queryler için validation eklemeyi unutma!!!! Genel error structure'ı da bir kontrol et!!!

  const convertedMoney = await rateService.currencyConverter(req.query.moneyFrom, req.query.moneyTo, req.query.amount)

  if (!convertedMoney) {
    return next(createError({
      status: NOT_FOUND,
      message: "Data is not valid!",
    }))
  }
  res.send(convertedMoney)
}



module.exports = { getLastRate: getLastRate, moneyConverter: moneyConverter }