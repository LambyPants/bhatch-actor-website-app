var express = require('express');
var router = express.Router();
var Announcement = require('../models/announcement');
var Nav = require("../models/navbar");

//NEW Announcement
router.get('/media/new', function(req,res){
   Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 res.render("announcements/new", {nav:nav});
         }
   });
});

//CREATE Announcement

router.post('/media', function(req,res){
 req.body.announcement.text = req.sanitize(req.body.announcement.text);
var formData = req.body.announcement;
Announcement.create(formData, function(err, newAnnouncement){
 if(err){
  res.render('announcements/new');
 } else {
  res.redirect("/media");
 }
});
});

//SHOW Announcement 
router.get("/media/:id/edit", function(req, res){
   Nav.find({}, function(err, nav){
  if(err){
   console.log(err);
  } else {
 Announcement.findById(req.params.id, function(err, announcement){
  if(err){
   res.redirect('/media');
  } else {
   res.render("announcements/edit", {announcement: announcement, nav:nav});
  }
 });
  }
});
});
//UPDATE Announcement
router.put("/media/:id", function(req,res){
 Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function(err, updatedAnnouncement){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

//DESTROY Announcment
router.delete("/:id", function(req,res){
 Announcement.findByIdAndRemove(req.params.id, function(err, announcement){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

module.exports = router;