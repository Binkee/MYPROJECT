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
  res.render('farmer-profile')
})

// COPY THIS


// router.get('/farmer-profile/edit') (req, res, next) => {
//   let id = req.params.id

//   productModel.findById(id)
//   .then((----) => {
//       res.render('------', {----})
//   })
//   .catch((error) => {
//       console.log(error)
//   })
// });

// router.post('/farmer-profile/edit', (req, res, next) => {
//   let id = req.params.id
//   const {name, quantity, product, price} = req.body

//     let editedProduct = { 
//   product: product,
//   farmerID: req.session.loggedInUser._id,
//   name: name,
//   quantity: quantity,
//   price: price,
// }
//     productModel.findByIdAndUpdate(id, editedProduct, {new: true})
//     .then(() => {
//         res.redirect('/farmer-profile')
//     })
//     .catch(() => {
//         console.log('Edit failed')
//     })
// });

// router.post('------', (req, res, next) => {
//   let id = req.params.id
//   productModel.findByIdAndDelete(id)
//       .then(() => {
//           res.redirect('----')
//       })
//       .catch(() => {
//           console.log('Delete failed')
//       })
// });









module.exports = router;