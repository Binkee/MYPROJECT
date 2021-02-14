const express = require('express');
const productModel = require('../models/product.model');
const router = express.Router();


router.get("/add", (req,res,next)=>{
  productModel.find()
  .then((products) => {
    res.render('addproduct.hbs', {products})
  })
  .catch((error) => {
    console.log(error)
  })
})

router.get('/add', (req, res, next) => {
  productModel.create()
  .then((product) => {
    res.render('addproduct.hbs', {product})
  })
  .catch((error) => {
    console.log(error)
  })
});




router.post("/add",(req,res,next)=>{
  const {name, quantity, product, price} = req.body
  let newProduct = { 
    product: product,
    farmerID: req.session.loggedInUser._id,
    name: name,
    quantity: quantity,
    price: price,
    
  }
  console.log(newProduct)
  productModel.create(newProduct)
  .then(() => {
    res.redirect('/farmer-profile')
  })
})

module.exports = router;

