var mongoose = require("mongoose");

//Mongoose Schema Config
var bioSchema = new mongoose.Schema({
 text: String,
});

module.exports = mongoose.model("Bio", bioSchema);
