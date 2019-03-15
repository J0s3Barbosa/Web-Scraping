var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";

describe("Teste API clashroyale",function(){

  it("clashroyaleapi Should receive data",function(done){
    request.get(
      {
        url : urlBase + "/api/v1/clashroyale/clashroyaleapi"
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
console.log(response.statusMessage)
        done(); 
      }
    );
  });


  it("endpoint clashs should return headers content",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashs"
    
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
console.log(response.headers["content-length"])
        
        done(); 
      }
    );
  });

  it("endpoint clashs error should  be null",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashs"
    
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
             expect(error).to.be.null;
        done(); 
      }
    );
  });

  it("endpoint clashs should not be null",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashs"
    
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

             expect(_body).not.to.be.null;
        
        done(); 
      }
    );
  });


  it("endpoint api/v1/clashroyale/clashs should return Auth failed",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashs"
    
    request.get(
      {
        url : url,

      },
      function(error, response, body){

        expect(error).to.be.null;
        expect(response.statusCode).to.be.eq(401);
        
        done(); 
      }
    );
  });

  it("endpoint api/v1/clashroyale/clashs should return Auth failed",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashs"
    
    request.get(
      {
        url : url,

      },
      function(error, response, body){

        expect(error).to.be.null;
        expect(response.statusMessage).to.be.eq('Unauthorized');
        
        done(); 
      }
    );
  });


  it("endpoint clashs should not be null",function(done){
    var url = urlBase + "/api/v1/clashroyale/clashsAllapi"
// var options = {
//   url : url,
//   headers: {'Authorization': tok}

// }
  var usersurl = urlBase + "/users/tokenlogin/";
  request.post(
{
  url : usersurl

},
function(error, response, body){
  // if (status == "success") {
  //   var txt = "";
  //   txt += "<p>Name: " + data.user.name + "</p>";
  //   txt += "<p>email: " + data.user.email + "</p>";
  //   txt += "<p>Token : " + data.token + "</p>";
  console.log(response )
  console.log(body)

  var _body = {};
  try{
    _body = JSON.parse(body);
  }
  catch(e){
    _body = {};
  }

  
}

);

    request.get(
      {
        url : url
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

    expect(response.statusCode).to.be.eq(200);
        
        done(); 
      }
    );
  });



});



