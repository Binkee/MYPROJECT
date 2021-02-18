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
  
  res.render('costumer-profile', {cart:req.session.cart, user: req.session.loggedInUser} )
})

router.post('/cart/:id', (req,res,next)=>{
  let id = req.params.id
  let quantity = req.body.quantity
  let name = req.body.name
  let price = req.body.price
  
  let newProduct = {
    id: id,
    quantity: quantity,
    name: name,
    price: price,
  }
  req.session.cart.push(newProduct)
  res.redirect("/costumer-profile")
})

router.get('/products',checkLoggedInUser, (req,res,next)=>{
  let user = req.session.loggedInUser 
  if(req.query && req.query.search){
    productModel.find({name:req.query.search})
    .then((products)=>{
       res.render('products-page', {products, user: user})
    })
    .catch(()=>{
  
    })
  } 
  else {
    productModel.find()
      .then((products)=>{
        res.render('products-page', {products, user})
      })
      .catch(()=>{

      })
  }
 
  }
)

router.post('/submitOrder',(req,res,next)=>{
  let total = 0;
  for(let i = 0; i < req.session.cart.length; i++) {
    total += req.session.cart[i].quantity * req.session.cart[i].price
    productModel.findById(req.session.cart[i].id)
    .then((product)=>{
     let newQuantity = product.quantity - req.session.cart[i].quantity
    productModel.findByIdAndUpdate(req.session.cart[i].id, {quantity: newQuantity})
    .then(()=>{
      req.session.cart = [];
      res.redirect("/costumer-profile")
    })
    })
  }
}) 
/*req.session.cart
let total += this.quantity * this.price
update products

farmer quantity - orderd quantity
.find(id, quantity)*/




module.exports = router;