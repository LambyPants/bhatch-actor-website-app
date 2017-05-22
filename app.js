var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//app config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//RESTful Routes

app.get('/', function(req,res){
 res.render('index');
});

app.get('/bio', function(req,res){
 res.render('bio');
});

app.get('/contact', function(req,res){
 res.render('contact');
});
app.get('/media', function(req,res){
 res.render('media');
});


app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Portfolio is a go!");
});