var express = require('express');
var router = express.Router();
var Bio = require('../models/bio');
var Nav = require("../models/navbar");

//SHOW bio page
router.get('/bio', function(req,res){
  Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Bio.find({}, function(err, bio){
  if(err){
   console.log(err);
  } else {
  res.render('bio', {bio: bio, nav: nav});
  }
 });
  }
});
});

//SHOW Bio
router.get("/bio/:id/edit", function(req,res){
   Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Bio.findById(req.params.id, function(err, bio){
  if(err){
   res.redirect("/bio");
  } else {
   res.render("bio/edit", {bio:bio, nav:nav});
  }
 });
  }
});
});



//UPDATE Bio
router.put("/bio/:id", function(req, res){
 Bio.findByIdAndUpdate(req.params.id, req.body.bio, function(err, updatedBio) {
     if(err){
      console.log(err);
     } else {
      res.redirect("/bio");
     }
 });
});

module.exports = router;