var http = require("http");

var BingSearch = function(){

    //https://api.cognitive.microsoft.com/bing/v5.0/images/search[?q][&count][&offset][&mkt][&safeSearch]
    var apiUrl = "https://api.cognitive.microsoft.com/bing/",
        apiVersion = "v5.0",
        apiImageSearch = "/images/search";

    var searchImages = function(searchParam, offset){
        if(!searchParam){
            throw new Error("The search parameter was not informed.");
        }
        return "";
    }

    return{
        searchImages : searchImages
    };
}();

module.exports = BingSearch;