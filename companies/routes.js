const { Router } = require('express')
const Company = require('./model')

const router = new Router()

router.get('/companies', (req, res, next) => {
  // Company.findAll('SELECT * from companies', (err,rows) => {
  //   console.log(rows)
  //})

   Company
    .findAll()
    .then(companies => {
      //const companyName = companies.map(company => company.name)
        res.send(companies)
       //res.send()
    })
    .catch(error => next(error))
  //const comp = test.map(test => test.name)
  //adding pagination to app

  // const limit = req.query.limit
  // const offset = req.query.offset

  // Company
  //   .count()
  //   .then(total => {
  //     Company
  //       .findAll({limit,offset})
  //       .then(companies => {
  //         res.send({companies,total})
  //       })
  //       .catch(error => next(error))
  //   })
  //   .catch(error => next(error))

})

router.get('/companies/:id', (req, res, next) => {
    Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `company does not exist`
        })
      }
      return res.send(customer)
    })
    .catch(error => next(error))
})

router.post('/companies', (req, res, next) => {
    Company
    .create(req.body)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `company does not exist`
        })
      }
      return res.status(201).send(company)
    })
    .catch(error => next(error))
})

router.put('/companies/:id', (req, res, next) => {
    Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `company does not exist`
        })
      }
      return company.update(req.body).then(company => res.send(company))
    })
    .catch(error => next(error))
})

router.delete('/companies/:id', (req, res, next) => {
    Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `company does not exist`
        })
      }
      return company.destroy()
        .then(() => res.send({
          message: `company was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router