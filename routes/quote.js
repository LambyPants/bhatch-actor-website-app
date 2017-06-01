var express = require('express');
var router = express.Router();
var Quote = require('../models/quote');
var Nav = require("../models/navbar");
var isLoggedIn = require("../middleware/index");


//SHOW quote page
router.get('/', function(req,res){
  Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Quote.find({}, function(err, quote){
  if(err){
   console.log(err);
  } else {
  res.render('index', {quote: quote, nav: nav});
  }
 });
  }
});
});

//SHOW quote
router.get("/quote/:id/edit", isLoggedIn, function(req,res){
   Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Quote.findById(req.params.id, function(err, quote){
  if(err){
   res.redirect("/");
  } else {
   res.render("quote/edit", {quote:quote, nav:nav});
  }
 });
  }
});
});



//UPDATE Bio
router.put("/quote/:id", isLoggedIn, function(req, res){
 Quote.findByIdAndUpdate(req.params.id, req.body.quote, function(err, updatedQuote) {
     if(err){
      console.log(err);
     } else {
      res.redirect("/");
     }
 });
});

module.exports = router;