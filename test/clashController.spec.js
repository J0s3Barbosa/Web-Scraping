var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";



describe("Teste API Itacoatiara48forecast",function(){

  it("getClashRoyaleList Should receive data",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/clashroyale/cr"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(response.statusMessage).to.be.equal('OK');

        done(); 
      }
    );
  });


  it("should return headers content",function(done){
    var url = urlBase + "/api/v1/clashroyale/cr"
    
    request.get(
      {
        url : url,

      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

             expect(response.headers["content-length"]).to.have.lengthOf.at.least(1);
        
        done(); 
      }
    );
  });

});



