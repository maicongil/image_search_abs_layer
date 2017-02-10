var chai = require('chai');
var expect = chai.expect;
var BingSearch = require("../lib/BingSearch.js");

chai.use(require('chai-things'));

describe('BingSearch', function(){

  describe('#searchImages()', function(){
    
    it('should throw error', function(){
      expect(function(){BingSearch.searchImages()}).to.throw('The search parameter was not informed.');
    });

    
  });
});

