var express = require('express');
var router = express.Router();
var isLoggedIn = require("../middleware/index");

var Nav = require("../models/navbar");


//SHOW Navbar
router.get("/navbar/:id/edit", isLoggedIn, function(req,res){
 
 Nav.findById(req.params.id, function(err, nav){
  if(err){
   console.log(err);
  } else {
   res.render("navbar/edit", {nav:nav});
  }
 });
});



//UPDATE Bio
router.put("/navbar/:id", isLoggedIn, function(req, res){
 Nav.findByIdAndUpdate(req.params.id, req.body.nav, function(err, updatedNav) {
     if(err){
      console.log(err);
     } else {
      res.redirect("/");
     }
 });
});

module.exports = router;