var mongoose = require("mongoose");

//Mongoose Schema Config
var photoSchema = new mongoose.Schema({
 title: String,    
 link: String,
});

module.exports = mongoose.model("Photo", photoSchema);
