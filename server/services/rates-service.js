const { ExchangeRates } = require('../models')

const savedExchangeRate = async () => {
  // TODO buraya service yazılacak. Buradan gelen kısımlara göre kullanılacaktır. 
}

const allRateSaveToDataBase = async (response) => {
  if (Object.keys(response.rates).length > 0) {
    for (let index = 0; index < Object.keys(response.rates).length; index++) {
      const element = Object.keys(response.rates)[index]
      const changedAmount = convertCurrency(response, element, 'TRY')
      response.rates[element] = changedAmount
    }
    await ExchangeRates.create({ meta: response.rates })
  }
}

const convertCurrency = (exchangeData, fromCurrency, toCurrency) => {
  const amount = exchangeData['rates']['TRY'] / exchangeData['rates'][fromCurrency]
  const targetAmount = amount * exchangeData['rates'][toCurrency]
  return targetAmount
}

module.exports = { allRateSaveToDataBase }