const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())


app.disable('x-powered-by')
app.use(require('./router').router)
app.use(require('./middleware/error-handling').all)

app.listen(port, () => { console.log(`Soft Blog app listening on port ${port}`) })