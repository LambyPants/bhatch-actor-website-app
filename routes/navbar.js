var express = require('express');
var router = express.Router();

var Nav = require("../models/navbar");


//SHOW Navbar
router.get("/navbar/:id/edit", function(req,res){
 
 Nav.findById(req.params.id, function(err, nav){
  if(err){
   console.log(err);
  } else {
   res.render("navbar/edit", {nav:nav});
  }
 });
});



//UPDATE Bio
router.put("/navbar/:id", function(req, res){
 Nav.findByIdAndUpdate(req.params.id, req.body.nav, function(err, updatedNav) {
     if(err){
      console.log(err);
     } else {
      res.redirect("/");
     }
 });
});

module.exports = router;