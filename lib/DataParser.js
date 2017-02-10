var qs = require('qs');

var DataParser = (function () {

  var extractUrlFromQueryString = function(url, queryStringParamKey){
    var query = qs.parse(url);
    return query[queryStringParamKey];
  };

  var createParsedObject = function(item) {
      var parsedObject = {
        imageUrl : extractUrlFromQueryString(item.contentUrl, "r"),
        altText : item.name,
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

