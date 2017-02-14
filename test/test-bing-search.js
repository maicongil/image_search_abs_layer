var chai = require('chai');
var expect = chai.expect;
var BingSearch = require("../lib/bing-search.js");
var data = require("../mock_data.json");

chai.use(require('chai-things'));

describe('BingSearch', function(){

  describe('#searchImages()', function(){
    
    it('should throw error', function(){
      expect(function(){BingSearch.searchImages();}).to.throw('The search parameter was not informed.');
    });

    it('should return fetched data', function(){
     
      fetcherStub = function() {
            return Promise.resolve(data);
      };

      var expected = data;

      return BingSearch.searchImages("img", 2, fetcherStub).then(function(result){
        expect(result).to.be.eql(expected);
      });
      
    });

  });
});

