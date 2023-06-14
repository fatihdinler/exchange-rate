const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./helper/config')
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json())

app.disable('x-powered-by')
app.use(require('./router').router)
app.use(require('./middleware/error-handling').httpErrors)
// require('./cron-jobs/exchange-rate')



//TODO BUNU CONVERTER OLARAK ROUTE'A EKLE VE KULLAN
// const CC = require('currency-converter-lt')

// let currencyConverter = new CC({ from: "USD", to: "TRY", amount: 1 })

// currencyConverter.convert().then((response) => {
//   console.log(response) //or do something else
// })

app.listen(config.APPLICATION_PORT, () => {
  console.log(`Exchange Rate app listening on port ${config.APPLICATION_PORT}`)
})