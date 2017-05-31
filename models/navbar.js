var mongoose = require("mongoose");

//Mongoose Schema Config
var navbarSchema = new mongoose.Schema({
 filmReel: {
  title: String,
  url: String,
  image: String
 },
 commercialReel: {
  title: String,
  url: String,
  image: String
 },
 voiceOverReel: String,
 resume: String
});

module.exports = mongoose.model("Nav", navbarSchema);
