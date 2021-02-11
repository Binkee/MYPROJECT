const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const costumerModel = require('../models/costumer.model.js')
const farmerModel = require('../models/farmer.model.js')
const productModel = require('../models/product.model.js')

router.get('/signin', (req,res,next)=>{
  res.render('auth/signin.hbs')
})

router.get('/signup', (req, res, next)=> {
  res.render('auth/signup.hbs')
})



module.exports = router