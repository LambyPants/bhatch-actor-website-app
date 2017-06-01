var express = require("express");
var app = express();
var mongoose    = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');
var passport = require('passport');
var LocalStrategy = require('passport-local');

//Routes Config
var announcementRoutes = require("./routes/announcements");
var photosRoutes = require("./routes/photos");
var bioRoutes = require("./routes/bio");
var navRoutes = require("./routes/navbar");
var indexRoutes = require("./routes/index");
var quoteRoutes = require("./routes/quote");

//Models Config
var User = require("./models/user");

mongoose.connect('mongodb://localhost/bhatch_portfolio_app');

//App Config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Passport Config
var secret = process.env.SECRET;  

app.use(require("express-session")({
 secret: secret,
 resave: false,
 saveUninitialized: false
 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
 res.locals.currentUser = req.user;
 next();
});



app.use(announcementRoutes);
app.use(photosRoutes);
app.use(bioRoutes);
app.use(navRoutes);
app.use(indexRoutes);
app.use(quoteRoutes);

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

// var newNav = new Nav({
//  filmReel: {
//   title: "TV / Film Demo",
//   url: "https://www.youtube.com/embed/mSMgSMmdvLw",
//   image:"https://i.ytimg.com/vi/mSMgSMmdvLw/default.jpg"
//  },
//  commercialReel: {
//   title: "Commercial Demo",
//   url: "https://www.youtube.com/embed/ElCXmrBiYAw",
//   image: "https://i.ytimg.com/vi/ElCXmrBiYAw/default.jpg"
//  },
//  voiceOverReel: "https://drive.google.com/file/d/0BzlZGNHBgaHTVmc1a1RCM2tsRW8tUldoaHdNNXY2WUZXSGs0/preview",
//  resume: "https://drive.google.com/file/d/0BzlZGNHBgaHTTmYzVXRBSmtBcTgwNkZVVWIyc19hVUk4VnNz/preview"
// });

// newNav.save(function(err, nav){
//  if(err){
//   console.log(err);
//  } else {
//   console.log(nav);
//  }
// });

// var newQuote = new Quote({
//  text: "An Amazing Performer. Focused. Incredible. Intense. --Tony Robbins"
// });

// newQuote.save(function(err, quote){
// if(err){
//  console.log(err);
// } else {
//  console.log(quote);
// }
// });

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Portfolio is a go!");
});