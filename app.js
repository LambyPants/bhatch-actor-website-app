var express = require("express");
var app = express();
var mongoose    = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

//Routes Config
var Announcement = require("./models/announcement");
var Photo = require("./models/photos");
var Bio = require("./models/bio");
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
 Bio.find({}, function(err, bio){
  if(err){
   console.log(err);
  } else {
  res.render('bio', {bio: bio});
  }
 });
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

//SHOW Bio
app.get("/bio/:id/edit", function(req,res){
 Bio.findById(req.params.id, function(err, bio){
  if(err){
   res.redirect("/bio");
  } else {
   res.render("bio/edit", {bio:bio});
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

//UPDATE Bio
app.put("/bio/:id", function(req, res){
 Bio.findByIdAndUpdate(req.params.id, req.body.bio, function(err, updatedBio) {
     if(err){
      console.log(err);
     } else {
      res.redirect("/bio");
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


// //Database Seed

// var newBio = new Bio({
//  text: "<p>Spicy jalapeno bacon ipsum dolor amet salami shankle frankfurter meatloaf pork belly, turkey bacon jowl leberkas rump ham pork loin ribeye venison. Ham hock rump pastrami, chicken beef ribs capicola tail sirloin ball tip. Sausage ham hock pancetta, kielbasa cupim corned beef pork burgdoggen tri-tip leberkas beef porchetta. Chicken cow meatloaf short loin porchetta beef turkey landjaeger rump t-bone sausage.</p><p>Pig alcatra doner shoulder beef t-bone. Shoulder meatball rump filet mignon leberkas shank alcatra bacon jerky cow strip steak. Chuck strip steak tri-tip turducken corned beef shankle t-bone short loin beef cupim venison ground round kevin. Beef pork shoulder andouille bacon fatback.</p><p>Capicola shank hamburger pork belly prosciutto jerky corned beef landjaeger tail sausage rump. Prosciutto porchetta t-bone sirloin. Kevin hamburger meatloaf ham brisket drumstick short ribs andouille. Pig ham hock picanha cow meatloaf fatback strip steak andouille boudin. T-bone jerky ham, short loin salami hamburger doner venison. Landjaeger filet mignon ham hock shoulder boudin pancetta.</p>"
// });

// newBio.save(function(err, bio){
//  if(err){
//   console.log(err);
//  } else {
//   console.log(bio);
//  }
// });

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Portfolio is a go!");
});