var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    port = process.env.PORT || 8000,
    mongoUrl = process.env.MONGO_URL || "mongodb://localhost/image_search_abs_layer";

mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//ROUTES
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});


app.listen(port, function(){
    console.log("Server is listening on port "+port);
});