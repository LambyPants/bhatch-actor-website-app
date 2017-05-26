var express = require("express");
var app = express();
var mongoose    = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var Announcement = require("./models/announcement");
var Photo = require("./models/photos");
mongoose.connect('mongodb://localhost/bhatch_portfolio_app');

//App Config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//RESTful Routes

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
 res.render("new");
});

//NEW Photo

app.get('/media/newphoto', function(req,res){
 res.render("/newphoto");
});

//CREATE Announcement

app.post('/media', function(req,res){
var formData = req.body.announcement;
Announcement.create(formData, function(err, newAnnouncement){
 if(err){
  res.render('/media/new');
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
   res.render("edit", {announcement: announcement});
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

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Portfolio is a go!");
});