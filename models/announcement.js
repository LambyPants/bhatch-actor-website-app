var mongoose = require("mongoose");

//Mongoose Schema Config
var announcementSchema = new mongoose.Schema({
 text: String,
});

module.exports = mongoose.model("Announcement", announcementSchema);
