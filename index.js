const express = require('express')
const bodyParser = require('body-parser')
const customersRouter = require('./customers/routes')
const companyRouter = require('./companies/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(customersRouter)
  .use(companyRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

