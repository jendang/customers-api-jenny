const { Router } = require('express')
const {toJWT} = require('./jwt')
//const {toData} = require('./jwt')
const router = new Router()
const User = require('../users/model')
const bcrypt = require('bcrypt');
const auth = require('./middleware')

router.post('/logins', (req, res, next) => {
  const {email,password} = req.body
  if(!email || !password){
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }else {
    //1.find user based on email address
    User
    .findOne({
      where:{
        email: req.body.email
      }
    }) 
    .then(entity => {
      if(!entity){
        res.status(400).send({
          message: 'User with that email does not exist'
        })
      }//if

      // 2. use bcrypt.compareSync to check the password against the stored hash
      if (bcrypt.compareSync(req.body.password, entity.password)) {
        res.send({
          jwt: toJWT({ userId: 1 })
        })

      }//if
      else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }
    })//then

    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
    



  }// 1st else

})//close post

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router