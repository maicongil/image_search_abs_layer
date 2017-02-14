var qs = require('qs');

var DataParser = (function () {

  var extractUrlFromQueryString = function(url, queryStringParamKey){
    var query = qs.parse(url);
    return query[queryStringParamKey];
  };

  var createParsedObject = function(item) {
      var parsedObject = {
        imageUrl : extractUrlFromQueryString(item.contentUrl, "r"),
        altText : item.name, //The Flicker api don't provide the alt text in the same request. I'm get the img name instead of make one request to each img for get the alt text.
        pageUrl : extractUrlFromQueryString(item.hostPageUrl, "r"),
      };
      return parsedObject;
  };

  var parseBingApi = function (data) {
    if(data && data.value.length > 0){
      var parsedData =[];
      data.value.forEach(function(item){
        parsedData.push(createParsedObject(item));
      });
      return parsedData;
    }else{
      return [];
    }
  };
  
  return {
    parseBingApi: parseBingApi
  };

})();

module.exports = DataParser;

