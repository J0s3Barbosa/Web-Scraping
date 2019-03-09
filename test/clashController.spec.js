let mongoose = require("mongoose");
const clashController = require('../routes/clashRoutes');
let ClashRoyale = require("../models/cr");

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";



describe("Teste API Itacoatiara48forecast",function(){

  it("getClashRoyaleList Should receive data",function(done){
    //should return object ClashRoyale

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
        // response.urlBase = null;
        // expect(response.urlBase).not.be.equal(null).and.not.undefined;
        // expect(response.urlBase).not.be.equal(undefined);
        expect(response.statusMessage).to.be.equal('OK');

    console.log(response.urlBase)
    console.log(response.headers)
    console.log(response.statusCode)
    console.log(response.statusMessage)
        
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

        // should(null).not.be.ok();
             expect(response.headers["content-length"]).to.have.lengthOf.at.least(1);
    // console.log(response.headers)
        
        done(); 
      }
    );
  });



  // it("Should receive data",function(done){

  //   request.get(
  //     {
  //       url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
  //     },
  //     function(error, response, body){

  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       expect(response.statusCode).to.equal(200);
  //       should(null).not.be.ok();

  //       expect(_body).to.be.an('array');
  //       expect(_body).to.have.lengthOf.at.most(5);
        
  //       done(); 
  //     }
  //   );
  // });

  // it("get Should be not null",function(done){
  //   request.get(
  //     {
  //       url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
  //     },
  //     function(error, response, body){

  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       should(null).not.be.ok();

  //       done(); 
  //     }
  //   );
  // });

  // it("_body Should be an('array",function(done){
  //   request.get(
  //     {
  //       url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
  //     },
  //     function(error, response, body){

  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       expect(_body).to.be.an('array');
  //       expect(_body).to.have.lengthOf.at.most(5);
        
  //       done(); 
  //     }
  //   );
  // });

  // it("_body Should have lengthOf.at.most(5)",function(done){
  //   request.get(
  //     {
  //       url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
  //     },
  //     function(error, response, body){

  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       expect(_body).to.have.lengthOf.at.most(5);
        
  //       done(); 
  //     }
  //   );
  // });


  // it("_body Should be.instanceof(Array",function(done){
  //   request.get(
  //     {
  //       url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
  //     },
  //     function(error, response, body){

  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       _body.should.be.instanceof(Array).and.have.lengthOf(1);

  //       done(); 
  //     }
  //   );
  // });



   
});



