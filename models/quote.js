var mongoose = require("mongoose");

//Mongoose Schema Config
var quoteSchema = new mongoose.Schema({
 text: String,
});

module.exports = mongoose.model("Quote", quoteSchema);
