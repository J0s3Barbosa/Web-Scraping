let mongoose = require("mongoose");
const clashController = require('../controllers/clashController');
let cr = require('../models/cr');

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";



describe("Teste API Itacoatiara48forecast",function(){
  it("Should receive data",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);
        should(null).not.be.ok();

        expect(_body).to.be.an('array');
        expect(_body).to.have.lengthOf.at.most(5);
        
        done(); 
      }
    );
  });

  it("get Should be not null",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        should(null).not.be.ok();

        done(); 
      }
    );
  });

  it("_body Should be an('array",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(_body).to.be.an('array');
        expect(_body).to.have.lengthOf.at.most(5);
        
        done(); 
      }
    );
  });

  it("_body Should have lengthOf.at.most(5)",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(_body).to.have.lengthOf.at.most(5);
        
        done(); 
      }
    );
  });


  it("_body Should be.instanceof(Array",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/weather/Itacoatiara48forecast"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        _body.should.be.instanceof(Array).and.have.lengthOf(1);

        done(); 
      }
    );
  });



   
});


 

// describe('/GET book', () => {
//   it('it should GET all the books', (done) => {

//         var listOfClashData =  clashController.getClashRoyaleList();
//         chai.request(listOfClashData)
//         .get('/api/v1/weather/Itacoatiara48forecast')
//         .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body.length.should.be.eql(0);
//           done();
//         });
//   });
// });

// describe('clashController', function () {

//   describe('getClashRoyaleList', function(){

//     it('should return true if valid user id', function(){
//    var listOfClashData =  clashController.getClashRoyaleList();
//       assert.equal(listOfClashData, !null);
//     });

//     it('should return false if invalid user id', function(){
//       var clashroyaleapi =  clashController.clashroyaleapi();
//             assert.equal(clashroyaleapi, !null);
//     });

//   });

// });







// jest tests
// test('getClashRoyaleList', ()=> {
//  var listOfClashData =  clashController.getClashRoyaleList();
//   expect(listOfClashData).not.toBe(null);
// });

// test('clashroyaleapi not null', ()=> {
//   var listOfClashData =  clashController.clashroyaleapi();
//    expect(listOfClashData).not.toBe(null);
//  });



 
