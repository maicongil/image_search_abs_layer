var request = require("request");

var BingSearch = function(){

    //https://api.cognitive.microsoft.com/bing/v5.0/images/search[?q][&count][&offset][&mkt][&safeSearch]
    
    var apiUrl = "https://api.cognitive.microsoft.com/bing/",
        apiVersion = "v5.0",
        apiImageSearch = "/images/search",
        apiKey = process.env.BING_API_KEY;

    var buildSearchUrl = function(path, searchParam, extraParams = []){
        var url = [apiUrl, apiVersion, path, "?q=", searchParam].concat(extraParams);
        return url.join('');
    };

    var defaultFetcher = function(url){

        var options = {
            url: url,
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey
            }
        };

        return new Promise(function(resolve, reject){
            request(options, function(error, response, body) {
                if(error){
                    reject("error");
                }
                
                if (response.statusCode === 200) {
                    resolve(JSON.parse(body));
                }else{
                    reject("error");
                }

            });
        });
    };

    var searchImages = function(searchParam, offset, fetcher = defaultFetcher){
        var extraParams =[];
        if(!searchParam){
            throw new Error("The search parameter was not informed.");
        }
        if(offset){
            if(isNaN(offset)){
                throw new Error("The offset must be a number.")
            }
            extraParams.push("&offset="+offset);
        }
        return fetcher(buildSearchUrl(apiImageSearch, searchParam, extraParams));
    }

    return{
        searchImages : searchImages
    };
}();

module.exports = BingSearch;