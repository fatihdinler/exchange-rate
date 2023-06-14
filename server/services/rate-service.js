const { ExchangeRates } = require('../models')

const compareLastTwoRow = async () => {
  const lastTwoRates = await ExchangeRates.lastTwoRow('created_at', 'desc')
  return calculationRates(lastTwoRates.map(item => JSON.parse(item.meta)))
}

const allRateSaveToDataBase = async (response) => {
  if (Object.keys(response.rates).length > 0) {
    for (let index = 0; index < Object.keys(response.rates).length; index++) {
      const element = Object.keys(response.rates)[index]
      const changedAmount = convertCurrency(response, element, 'TRY')
      response.rates[element] = changedAmount.toFixed(2)
    }
    await ExchangeRates.create({ meta: response.rates })
  }
}

const convertCurrency = (exchangeData, fromCurrency, toCurrency) => {
  const amount = exchangeData['rates']['TRY'] / exchangeData['rates'][fromCurrency]
  const targetAmount = amount * exchangeData['rates'][toCurrency]
  return targetAmount
}

const calculationRates = (rate) => {
  let result = {}

  for (const key in rate[1]) {
    const values = rate.map(item => parseFloat(item[key]))
    const maxValue = Math.max(...values)
    const maxIndex = values.indexOf(maxValue)

    result[key] = [maxValue, (maxIndex === 0)]
  }
  return result
}


module.exports = { allRateSaveToDataBase, compareLastTwoRow }