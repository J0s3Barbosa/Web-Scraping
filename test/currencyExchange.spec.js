var assert = require("assert");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";
var urlBaseexchangeratesapi = "https://api.exchangeratesapi.io";
const currencyExchange = require("../models/currencyExchange");

describe("currency exchange tests", function() {
  it("_body.rates.BRL).not.to.be.null.and.not.to.be.undefined", function(done) {
    currencyExchange.from = "USD";
    request.get(
      {
        url: urlBaseexchangeratesapi + "/latest?base=" + currencyExchange.from
      },
      function(error, response, body) {
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        expect(response.statusMessage).to.be.equal("OK");
        expect(_body.rates.BRL).not.to.be.null.and.not.to.be.undefined;

        done();
      }
    );
  });

  it("should return property value", function(done) {
    currencyExchange.from = "USD";
    currencyExchange.to = "BRL";

    request.get(
      {
        url: urlBaseexchangeratesapi + "/latest?base=" + currencyExchange.from
      },
      function(error, response, body) {
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        expect(response.statusMessage).to.be.equal("OK");
        expect(_body.rates).not.to.be.null.and.not.to.be.undefined;
        var listOfRates = _body.rates;

        currencyExchange.result = GetPropValue(
          listOfRates,
          currencyExchange.to
        );
        expect(currencyExchange.result).not.to.be.null.and.not.to.be.undefined;

        done();
      }
    );
  });

  it("result should be a Number", function(done) {
    var exchangeBaseFrom = "USD";
    var exchangeTo = "BRL";

    CurrencyConvert(exchangeBaseFrom, exchangeTo)
      .then(function(body) {
        expect(body.result).not.to.be.null.and.not.to.be.undefined;
        expect(body.result).to.be.instanceOf(Number);
      })
      .catch(function(err) {
        return err;
      });
    done();
  });

  it("body.result).not.to.be.null.and.not.to.be.undefined", function(done) {
    var exchangeBaseFrom = "USD";
    var exchangeTo = "BRL";

    CurrencyConvert(exchangeBaseFrom, exchangeTo)
      .then(function(body) {
        expect(body.result).not.to.be.null.and.not.to.be.undefined;
      })
      .catch(function(err) {
        return err;
      });
    done();
  });

  it("body.result).not.to.be.null.and.not.to.be.undefined", function(done) {
    var exchangeBaseFrom = "USD";
    var exchangeTo = "BRL";

    CurrencyConvert(exchangeBaseFrom, exchangeTo)
      .then(function(body) {
        expect(body.result).not.to.be.null.and.not.to.be.undefined;
      })
      .catch(function(err) {
        return err;
      });
    done();
  });

  function CurrencyConvert(exchangeBaseFrom, exchangeTo) {
    const url = urlBaseexchangeratesapi + "/latest?base=" + exchangeBaseFrom;

    return new Promise(function(resolve, reject) {
      request(url, function(err, response, body) {
        if (err) reject(err);
        if (response.statusCode !== 200) {
          reject("Invalid status code: " + response.statusCode);
        }

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        var listOfRates = _body.rates;
        var result = GetPropValue(listOfRates, exchangeTo);

        resolve({ result });
      });
    });
  }

  function GetPropValue(obj, objProp) {
    for (var i in obj) {
      if (obj.hasOwnProperty(objProp) && i == objProp) {
        return obj[i];
      }
    }
  }

  function showProps(obj, objName) {
    var result = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
      }
    }

    return result;
  }

    it("_body.rates.BRL).not.to.be.null.and.not.to.be.undefined", function(done) {

      var exchangeBase = "USD";
      request.get(
          {
            url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
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
            expect(_body.rates.BRL).not.to.be.null.and.not.to.be.undefined;

            done();
          }
        );

    });

    it("response.statusMessage).to.be.equal('OK", function(done) {

      var exchangeBase = "USD";
      request.get(
          {
            url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
          },
          function(error, response, body){

            expect(response.statusMessage).to.be.equal('OK');
            done();
          }
        );

    });

    it("_body).not.to.be.null.and.not.to.be.undefined", function(done) {

      var exchangeBase = "USD";
      request.get(
          {
            url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
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
            expect(_body).not.to.be.null.and.not.to.be.undefined;

            done();
          }
        );

    });

  it("value should retorn 1.83", function(done) {
    assert.equal(-1, round(-1));
    assert.equal(0, round(0));
    assert.equal(1.83, round(1.83458));
    done();
  });

  function round(num) {
    if (num == null) return null;
    return Math.round(num * 100) / 100;
  }

  it("saving data. status should be 201", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=USD&to=BRL";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        expect(_body).not.to.be.null.and.not.to.be.undefined;
        expect(response.statusCode).to.be.equal(201);

      }
    );
    done();
  });


  it("Post test from=EUR&to=BRL", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=EUR&to=BRL";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        expect(_body).not.to.be.null.and.not.to.be.undefined;
        expect(response.statusCode).to.be.equal(201);

      }
    );
    done();
  });

  it("Post test from=BRL&to=USD", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=BRL&to=USD";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        expect(_body).not.to.be.null.and.not.to.be.undefined;
        expect(response.statusCode).to.be.equal(201);

      }
    );
    done();
  });

  it("Post test from=BRL&to=EUR", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=BRL&to=EUR";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        expect(_body).not.to.be.null.and.not.to.be.undefined;
        expect(response.statusCode).to.be.equal(201);

      }
    );
    done();
  });

  it("Post test from=BRL&to=", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=BRL&to=";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        var message ="You need to informe the Currencies /?from=xxx&to=xxx"
        expect(_body.message).to.be.equal(message);
        

      }
    );
    done();
  });

  it("Post test from=&to=", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=&to=";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        var message ="You need to informe the Currencies /?from=xxx&to=xxx"
        expect(_body.message).to.be.equal(message);
        

      }
    );
    done();
  });

  it("Post test from=&to=USD", function(done) {
    var url = urlBase + "/currencyExchange/ConvertSave/?from=&to=USD";
    request.post(
      {
        url: url
      },
      function(error, response, body) {

        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }
        var message ="You need to informe the Currencies /?from=xxx&to=xxx"
        expect(_body.message).to.be.equal(message);
        

      }
    );
    done();
  });


  it("Getall test",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/getall"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(response.statusCode).to.be.equal(200);
        done(); 
      }
    );
  });

  it("test currencyExchange/Convert/?from=USD&to=BRL",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/Convert/?from=USD&to=BRL"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body).not.to.be.null.and.not.to.be.undefined;
        done(); 
      }
    );
  });



  it("test currencyExchange/Convert/?from=USD&to=",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/Convert/?from=USD&to="
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body.message).to.be.equal('You need to informe the Currencies /?from=xxx&to=xxx');
        done(); 
      }
    );
  });



  it("test currencyExchange/Convert/?from=&to=USD",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/Convert/?from=&to=USD"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body.message).to.be.equal('You need to informe the Currencies /?from=xxx&to=xxx');
        done(); 
      }
    );
  });


  it("test currencyExchange/Convert/?from=&to=",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/Convert/?from=&to="
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body.message).to.be.equal('You need to informe the Currencies /?from=xxx&to=xxx');
        done(); 
      }
    );
  });
  it("test /currencyExchange statusMessage).to.be.equal('OK",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/"
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
  it("test /currencyExchange message).to.be.equal" ,function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body.message).to.be.equal("/currencyExchange/Convert/?from=USD&to=BRL");
        done(); 
      }
    );
  });
  it("test /currencyExchange message).not.to.be.equal",function(done){
    request.get(
      {
        url : urlBase + "/currencyExchange/"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(_body.message).not.to.be.equal("/currencyExchange/Convert/?from=USD&to=BRL1");
        done(); 
      }
    );
  });



});
