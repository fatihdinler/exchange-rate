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
require('./cron-jobs/exchange-rate')

app.listen(config.APPLICATION_PORT, () => {
  console.log(`Exchange Rate app listening on port ${config.APPLICATION_PORT}`)
})