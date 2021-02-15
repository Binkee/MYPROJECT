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
router.get('/costumer-profile',checkLoggedInUser, (req,res,next)=>{
  res.render('costumer-profile', {cart:req.session.cart} )
})

router.post('/cart/:id', (req,res,next)=>{
  let id = req.params.id
  let quantity = req.body.quantity
  let name = req.body.name
  
  let newProduct = {
    id: id,
    quantity: quantity,
    name: name
  }
  req.session.cart.push(newProduct)
  res.redirect("/costumer-profile")
})

router.get('/products',checkLoggedInUser, (req,res,next)=>{
  if(req.query && req.query.search){
    productModel.find({name:req.query.search})
    .then((products)=>{
       res.render('products-page', {products})
    })
    .catch(()=>{
  
    })
  } 
  else {
    productModel.find()
      .then((products)=>{
        res.render('products-page', {products})
      })
      .catch(()=>{

      })
  }
 
  }
)



module.exports = router;