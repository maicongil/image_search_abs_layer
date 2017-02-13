var chai = require('chai');
var expect = chai.expect;
var DataParser = require("../lib/data-parser.js");
var data = require("../mock_data.json");
chai.use(require('chai-things'));

describe('DataParser', function(){

  describe('#parseBingApi()', function(){
    
    it('should return an empty array', function(){
      var result = DataParser.parseBingApi({"value" : []});
      expect(result).to.be.empty;
    });

    it('should return not empty array', function(){
      var result = DataParser.parseBingApi(data);
      expect(result).to.be.not.empty;
    });

    it('should return an array with the same length as data', function(){
      var result = DataParser.parseBingApi(data).length;
      var expected = data["value"].length
      expect(result).equal(expected);
    });

    it('should parsed objects in array have properties "imageUrl", "altText" and "pageUrl"' , function(){      
      var result = DataParser.parseBingApi(data);
      expect(result).all.have.property('imageUrl');
      expect(result).all.have.property('altText');
      expect(result).all.have.property('pageUrl');
    });

    it('should parsed objects in array have properties "imageUrl", "altText" and "pageUrl" with parsed values' , function(){      
     
      var result = DataParser.parseBingApi(data);

      expect(result[0]).have.property('imageUrl', 'http://eulife.appchallenge.net/wp-content/uploads/2015/07/javascript.png');
      expect(result[0]).have.property('altText', 'Simple Open Data Javascript Tutorial#EULife @AppChallenge');
      expect(result[0]).have.property('pageUrl', 'http://eulife.appchallenge.net/tutorial-7-building-a-javascript-eulife-app/');

      expect(result[1]).have.property('imageUrl', 'http://www.b2bweb.fr/wp-content/uploads/js-logo-badge-512.png');
      expect(result[1]).have.property('altText', 'JavaScript community : “Agnostic” logo proposal – Work Wild Web ...');
      expect(result[1]).have.property('pageUrl', 'http://www.b2bweb.fr/molokoloco/javascript-community-agnostic-logo-proposal/');

    });    
  });
});

