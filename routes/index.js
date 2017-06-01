var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
var Nav = require("../models/navbar");
var Announcement = require("../models/announcement");
var Photo = require("../models/photos");

//SHOW Signup
router.get('/register', function(req,res){
 Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 res.render("register",{nav:nav});
  }
});
});
//SIGNUP Logic
router.post('/register', function(req,res){
 var newUser = new User({username: req.body.username});
 User.register(newUser, req.body.password, function(err, user){
  if(err){
   console.log(err);
   return res.render("register");
  }
  passport.authenticate("local")(req, res, function(){
   res.redirect("/");
  });
 });
});

//SHOW Login
router.get('/login', function(req,res){
  Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 res.render("login", {nav:nav});
  }
});
});
//Login Logic
router.post("/login", passport.authenticate("local", 
{
 successRedirect: "/", 
 failureRedirect:"/login"
 
}), function(req, res) {
   
});

//Logout Logic

router.get("/logout", function(req, res) {
   req.logout(); 
   res.redirect("/");
});

//middleware for Login

function isLoggedIn(req, res, next){
 if(req.isAuthenticated()){
  return next();
 }
 res.redirect("/login");
}


//General Routes


//SHOW contact page
router.get('/contact', function(req,res){
 Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
   res.render("contact", {nav: nav});
  }
 });
});

//SHOW media page
router.get('/media', function(req,res){
  Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Announcement.find({}, function(err, announcement){
  if(err) {
   console.log(err);
  } else {
  Photo.find({}, function(err, photo){
   if(err){
    console.log(err);
   } else {
    res.render("media", {announcement: announcement, photo: photo, nav: nav});
   }
  });
  }
 });
  }
 });
});


module.exports = router;