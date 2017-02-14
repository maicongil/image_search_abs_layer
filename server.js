var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    port = process.env.PORT || 8000,
    mongoUrl = process.env.MONGO_URL || "mongodb://localhost/image_search_abs_layer",
    indexRoutes = require("./routes/index.js"),
    searchRoutes = require("./routes/search.js");

mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES

app.use("/", indexRoutes);
app.use("/search", searchRoutes);

app.get("*", function(req, res){
    res.send("Not found");
});

app.listen(port, function(){
    console.log("Server is listening on port "+port);
});