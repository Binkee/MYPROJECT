const express = require('express');
const productModel = require('../models/product.model');
const router = express.Router();


router.get("/add", (req,res,next)=>{
  let user = req.session.loggedInUser
  productModel.find()
  .then((products) => {
    res.render('addproduct.hbs', {products, user})
  })
  .catch((error) => {
    console.log(error)
  })
})


router.post("/add",(req,res,next)=>{
  const {name, quantity, product, price} = req.body
  let newProduct = { 
    product: product,
    farmerID: req.session.loggedInUser._id,
    name: name,
    quantity: quantity,
    price: price,
    
  }
  //console.log(newProduct)
  productModel.create(newProduct)
  .then((products) => {
    res.redirect('/farmer-profile')
  })
})

module.exports = router;

