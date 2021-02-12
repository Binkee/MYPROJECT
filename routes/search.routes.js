const express = require('express');
const router = express.Router();

router.post("/search",(req,res,next)=>{
  const {searchResult} = req.body
  console.log(req.body)
  res.render("search.hbs", {searchResult})
  
})

module.exports = router;