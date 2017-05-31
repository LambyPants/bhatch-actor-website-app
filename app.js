var express = require("express");
var app = express();
var mongoose    = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var Announcement = require("./models/announcement");
var Photo = require("./models/photos");
var expressSanitizer = require('express-sanitizer');

mongoose.connect('mongodb://localhost/bhatch_portfolio_app');

//App Config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//ROUTES

//INDEX Route
app.get('/', function(req,res){
 res.render('index');
});

//SHOW bio page
app.get('/bio', function(req,res){
 res.render('bio');
});

//SHOW contact page
app.get('/contact', function(req,res){
 res.render('contact');
});

//SHOW media page
app.get('/media', function(req,res){
 Announcement.find({}, function(err, announcement){
  if(err) {
   console.log(err);
  } else {
  Photo.find({}, function(err, photo){
   if(err){
    console.log(err);
   } else {
    res.render("media", {announcement: announcement, photo: photo});
   }
  });
  }
 });
});

//NEW Announcement
app.get('/media/new', function(req,res){
 res.render("announcements/new");
});

//NEW Photo

app.get('/media/photos/new', function(req,res){
 res.render("photos/new");
});

//CREATE Announcement

app.post('/media', function(req,res){
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

//CREATE Photo

app.post('/media/photos', function(req,res){
 var formData = req.body.photo;
 Photo.create(formData, function(err, newPhoto){
  if(err){
   res.render('photos/new');
  } else {
   res.redirect("/media");
  }
 });
});

//SHOW Announcement 
app.get("/media/:id/edit", function(req, res){
 Announcement.findById(req.params.id, function(err, announcement){
  if(err){
   res.redirect('/media');
  } else {
   res.render("announcements/edit", {announcement: announcement});
  }
 });
});

//SHOW Photo
app.get("/media/photos/:id/edit", function(req,res){
 Photo.findById(req.params.id, function(err, photo){
  if(err){
   res.redirect("/media");
  } else {
   res.render("photos/edit", {photo: photo});
  }
 });
});

//UPDATE Announcement
app.put("/media/:id", function(req,res){
 Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function(err, updatedAnnouncement){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

//UPDATE Photo

app.put("/media/photos/:id", function(req,res){
 Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

//DESTROY Announcment
app.delete("/:id", function(req,res){
 Announcement.findByIdAndRemove(req.params.id, function(err, announcement){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

//DESTROY Photo
app.delete("/photos/:id", function(req,res){
 Photo.findByIdAndRemove(req.params.id, function(err, photo){
  if(err){
   console.log(err);
  } else {
   res.redirect("/media");
  }
 });
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Portfolio is a go!");
});