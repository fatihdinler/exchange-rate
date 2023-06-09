const cron = require('node-cron')
const axios = require('axios');
const ratesService = require('../services/rates-service')
const config = require('../helper/config')

const cronSchedule = cron.schedule('0 */6 * * *', () => {
  axios.get('https://api.apilayer.com/exchangerates_data/latest?symbols=&base=TRY',
    {
      headers: {
        apiKey: "sZKZQuqtnGHHQ1FnTLIkU2VpxHy5EFKA" // TODO bunu config'e bağla
      }
    })
    .then(async response => {
      console.log('Response Successfully !!')
      await ratesService.allRateSaveToDataBase(response?.data)
    })
    .catch(error => {
      console.log("error ---->", error)
      console.error('Response Failed !!', error.response.data.message || error.request.data.message)
    })
  console.log('running a task every minute')
})

cronSchedule.start()


