const express = require('express')
const bodyParser = require('body-parser')
const customersRouter = require('./customers/routes')
const companyRouter = require('./companies/routes')
const auth = require('./auth/routes')
const user = require('./users/routes')

const app = express()


const port = process.env.PORT || 4000

//app.get()


app
  .use(express.static('static-files'))
  .use(bodyParser.json())
  .use(customersRouter)
  .use(companyRouter)
  .use(auth)
  .use(user)
  .listen(port, () => console.log(`Listening on port ${port}`))

