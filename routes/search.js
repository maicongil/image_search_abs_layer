var express =require("express"),
    router = express.Router(),
    bingSearch = require("../lib/bing-search.js"),
    dataParser = require("../lib/data-parser.js"),
    searchModel = require("../models/search.js");

router.get("/", function(req, res){
    //User Story: I can get a list of the most recently submitted search strings.

    searchModel.find({}).
    limit(10).
    sort({ searchDate: -1 }).
    exec(function(error, results){
        if(error){
            console.log(error);
            res.send(JSON.stringify({error : error}));
        }
        
        var formatedResults = results.map(function(item){
            return {searchString : item.searchString, searchDate : item.searchDate};
        });

        res.send(JSON.stringify(formatedResults));
    });
});

router.get("/:searchString", function(req, res){
    //User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string
    //User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

    searchModel.create({searchString : req.params.searchString}, function(error, createdSearch){
        if(error){
            console.log(error);
            res.send(JSON.stringify({error : error}));
        }

        var returnData ={
            searchString : req.params.searchString,
            offset : req.query.offset,
            data : []
        };

        bingSearch.searchImages(req.params.searchString, req.query.offset).then(function(data){
            returnData.data = dataParser.parseBingApi(data);
            res.send(JSON.stringify(returnData));
        });

    });
});


module.exports = router;
