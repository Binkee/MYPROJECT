const router = require("express").Router();
const express = require('express');
const costumerModel = require('../models/costumer.model.js')
const farmerModel = require('../models/farmer.model.js')
const productModel = require('../models/product.model.js')

//Middleware
const checkLoggedInUser = (req, res, next) => {
  if (req.session.loggedInUser) {
      next()
  }
  else {
      res.redirect('/signin')
  }
}


// after sign in you go to the farmer profile
router.get('/farmer-profile',checkLoggedInUser, (req,res,next)=>{
  productModel.find({farmerID:req.session.loggedInUser._id})
  .then((product)=>{
    res.render('farmer-profile', {product})
  })
  
})

router.get('/farmer-profile/:id/edit', (req, res, next) => {
  let id = req.params.id
  productModel.findById(id)
  .then((product)=>{
    res.render('update-form.hbs', {product})
  })
  .catch(()=>{
    console.log('Something went wrong while finding')
  })
});


router.post('/farmer-profile/:id/edit', (req, res, next) => {
  let id = req.params.id
  const {name,quantity, price} = req.body

  let editedProduct = {
    name:name,
    quantity: quantity,
    price: price,
  }

  productModel.findByIdAndUpdate(id, editedProduct)
  .then(()=>{
    res.redirect('/farmer-profile')
  })
  .catch(()=>{
    console.log('Edit failed')
  })
});

router.post('/farmer-profile/:id/delete', (req, res, next) => {
  let id = req.params.id
  productModel.findByIdAndDelete(id)
      .then(() => {

          res.redirect('/farmer-profile')
      })
      .catch(() => {
          console.log('Delete failed!')
      })
})

  
module.exports = router;