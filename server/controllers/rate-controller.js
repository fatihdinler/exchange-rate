const rateService = require("../services/rate-service")
const { createError, NOT_FOUND, BAD_REQUEST } = require('../helper/error')
const moneyTypes = require('../money-types.json')

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

const moneyConverter = async (req, res, next) => {
  const validationErrors = rateValidatons(req)

  if (validationErrors.length > 0) return next(createError({ status: BAD_REQUEST, validationError: validationErrors }))

  const convertedMoney = await rateService.currencyConverter(req.query.moneyFrom, req.query.moneyTo, req.query.amount)

  if (!convertedMoney) {
    return next(createError({
      status: NOT_FOUND,
      message: "Data is not valid!",
    }))
  }

  res.status(200).json({ convertedData: convertedMoney })
}


const rateValidatons = (req) => {
  let validationErrors = []

  if (!Object.keys(moneyTypes.symbols).includes(req.query.moneyFrom)) {
    validationErrors.push({ message: "moneyFrom must be a include in money-types.json" })
  }

  if (!Object.keys(moneyTypes.symbols).includes(req.query.moneyTo)) {
    validationErrors.push({ message: "moneyTo must be a include in money-types.json" })
  }

  return validationErrors
}



module.exports = { getLastRate: getLastRate, moneyConverter: moneyConverter }