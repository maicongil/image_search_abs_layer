var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    port = process.env.PORT || 8000,
    bingSearch = require("./lib/bing-search.js"),
    dataParser = require("./lib/data-parser.js"),
    mongoUrl = process.env.MONGO_URL || "mongodb://localhost/image_search_abs_layer";

mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//ROUTES
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/search", function(req, res){
    //User Story: I can get a list of the most recently submitted search strings.
    res.send("THIS IS LIST OF SEARCH");
});

app.get("/search/:searchString", function(req, res){
    //User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string
    //User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.
    var returnData ={
        searchString : req.params.searchString,
        offset : req.query.offset,
        data : []};
    bingSearch.searchImages(req.params.searchString, req.query.offset).then(function(data){
        returnData.data = dataParser.parseBingApi(data);
        res.send(JSON.stringify(returnData));
    });
});

app.get("*", function(req, res){
    res.send("Not found");
});

app.listen(port, function(){
    console.log("Server is listening on port "+port);
});