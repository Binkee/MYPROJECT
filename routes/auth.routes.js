const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const costumerModel = require('../models/costumer.model.js')
const farmerModel = require('../models/farmer.model.js')
const productModel = require('../models/product.model.js')


// Shows the sign in form to the user
router.get('/signin', (req,res,next)=>{
  res.render('auth/signin.hbs')
})

// shows the sign up form to the user
router.get('/signup', (req, res, next)=> {
  res.render('auth/signup.hbs')
})


router.post("/signup", (req, res, next) => {
  // we use req.body to grab data from the input form
   const {username, password, email, role} = req.body
    
   // Encrypting passwords
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
   
   // checking if the user has entered all the three fields 
    if (!username.length || !password.length) {
      res.render('auth/signup', {msg: 'Please enter all fields'})
      return;
  }
  // checks if the farmer logged in and sent it to his profile
    if(role === "farmer"){
    farmerModel.create({username, email, password: hash})
    .then(()=>{
      res.redirect('/farmer-profile')
    })
    .catch((err)=>{
      next(err)
    })
  // checks if the costumer logged in and sent it to his profile
   } else {
     costumerModel.create({username, email, password: hash})
     .then(()=>{
       res.render('costumer-profile')
     })
     .catch((err)=>{
       next(err)
     })
   }
})



//  handle post requests when the user submits something in the sign in form

router.post("/signin", (req, res, next) => {
  const {username, password} = req.body

  // implement the same set of validations as you did in signup as well
  // NOTE: We have used the Async method here. Its just to show how it works
  farmerModel.findOne({username: username})
      .then((result) => {
          // if user exists
          if (result) {
              //check if the entered password matches with that in the DB
              bcrypt.compare(password, result.password)
                  .then((isMatching) => {
                      if (isMatching) {
                          // when the user successfully signs up
                          req.session.loggedInUser = result
                          res.redirect('/farmer-profile')
                      }
                      else {
                          // when passwords don't match
                          res.render('auth/signin.hbs', {msg: 'Passwords dont match'})
                      }
                  })
          }
          else {
            costumerModel.findOne({username: username})
            .then((result) => {
                // if user exists
                if (result) {
                    //check if the entered password matches with that in the DB
                    bcrypt.compare(password, result.password)
                        .then((isMatching) => {
                            if (isMatching) {
                                // when the user successfully signs up
                                req.session.loggedInUser = result
                                res.redirect('/costumer-profile')
                            }
                            else {
                                // when passwords don't match
                                res.render('auth/signin.hbs', {msg: 'Passwords dont match'})
                            }
                        })
                }
                else {
                    // when the user signs in with an email that does not exits
                    res.render('auth/signin.hbs', {msg: 'Username does not exist'})
                }
            })
            .catch((err) => {
                next(err)
            })
          }
      })
      .catch((err) => {
          next(err)
      })

   
 
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})





module.exports = router