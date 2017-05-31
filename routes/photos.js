var express = require('express');
var router = express.Router();
var Photo = require('../models/photos');
var Nav = require("../models/navbar");
//NEW Photo

router.get('/media/photos/new', function(req,res){
   Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 res.render("photos/new", {nav:nav});
  }
  });
});



//CREATE Photo

router.post('/media/photos', function(req,res){
 var formData = req.body.photo;
 Photo.create(formData, function(err, newPhoto){
  if(err){
   res.render('photos/new');
  } else {
   res.redirect("/media");
  }
 });
});



//SHOW Photo
router.get("/media/photos/:id/edit", function(req,res){
  Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Photo.findById(req.params.id, function(err, photo){
  if(err){
   res.redirect("/media");
  } else {
   res.render("photos/edit", {photo: photo, nav: nav});
  }
 });
  }
});
});


//UPDATE Photo

router.put("/media/photos/:id", function(req,res){
 Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});


//DESTROY Photo
router.delete("/photos/:id", function(req,res){
 Photo.findByIdAndRemove(req.params.id, function(err, photo){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});


module.exports = router;