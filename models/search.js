var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
    searchString : String,
    searchDate : {type : Date, default : Date.now}
});

module.exports = mongoose.model("Search", searchSchema);