const cron = require('node-cron')
const axios = require('axios');
const rateService = require('../services/rate-service')
const config = require('../helper/config')

const cronSchedule = cron.schedule('* * * * *', () => {
  axios.get('https://api.apilayer.com/exchangerates_data/latest?symbols=&base=TRY',
    {
      headers: {
        apiKey: config.EXCHANGE_RATE_API_KEY
      }
    })
    .then(response => {
      console.log('Api Response Successfully !!')
      return rateService.allRateSaveToDataBase(response?.data)
    })
    .catch(error => {
      console.error('Response Failed !!', error.response.data.message || error.request.data.message)
    })
})

cronSchedule.start()


