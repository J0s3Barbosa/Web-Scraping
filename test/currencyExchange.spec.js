var assert = require("assert");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:5000";
var urlBaseexchangeratesapi = "https://api.exchangeratesapi.io";

describe("currency exchange tests", function() {
  //   convert( "GBP",  "HKD", 12.99)

  //   function convert(from, to, value) {
  //     var convertedValue = 0;
  //     from = 'USD'
  //     to = 'BRL'

  //     let convertedValue = moneyAmount * exchange_factor

  //     return convertedValue;
  //   }

  //   function GetExchangeRate(currency) {
  //     var currencyRate = 0;

  //     return currencyRate;
  //   }

  it("_body.rates.BRL).not.to.be.null.and.not.to.be.undefined", function(done) {
    var exchangeBase = "USD";
    request.get(
      {
        url: urlBaseexchangeratesapi + "/latest?base=" + exchangeBase
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
    var exchangeBaseFrom = "USD";
    var exchangeTo = "BRL";
    request.get(
      {
        url: urlBaseexchangeratesapi + "/latest?base=" + exchangeBaseFrom
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

        var val = GetPropValu(listOfRates, exchangeTo);
        console.log(val);

        done();
      }
    );
  });

  function CurrencyConvert(exchangeBaseFrom, exchangeTo) {
    request.get(
      {
        url: urlBaseexchangeratesapi + "/latest?base=" + exchangeBaseFrom
      },
      function(error, response, body) {
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        var listOfRates = _body.rates;
        return GetPropValu(listOfRates, exchangeTo);
      }
    );
  }

  function GetPropValu(obj, objProp) {
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

  //   it("_body.rates.BRL).not.to.be.null.and.not.to.be.undefined", function(done) {

  //     var exchangeBase = "USD";
  //     request.get(
  //         {
  //           url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
  //         },
  //         function(error, response, body){

  //           var _body = {};
  //           try{
  //             _body = JSON.parse(body);
  //           }
  //           catch(e){
  //             _body = {};
  //           }
  //           expect(response.statusMessage).to.be.equal('OK');
  //           expect(_body.rates.BRL).not.to.be.null.and.not.to.be.undefined;

  //           done();
  //         }
  //       );

  //   });

  //   it("response.statusMessage).to.be.equal('OK", function(done) {

  //     var exchangeBase = "USD";
  //     request.get(
  //         {
  //           url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
  //         },
  //         function(error, response, body){

  //           expect(response.statusMessage).to.be.equal('OK');
  //           done();
  //         }
  //       );

  //   });

  //   it("_body).not.to.be.null.and.not.to.be.undefined", function(done) {

  //     var exchangeBase = "USD";
  //     request.get(
  //         {
  //           url : urlBaseexchangeratesapi + "/latest?base="+exchangeBase
  //         },
  //         function(error, response, body){
  //           var _body = {};
  //           try{
  //             _body = JSON.parse(body);
  //           }
  //           catch(e){
  //             _body = {};
  //           }
  //           expect(response.statusMessage).to.be.equal('OK');
  //           expect(_body).not.to.be.null.and.not.to.be.undefined;

  //           done();
  //         }
  //       );

  //   });
});
