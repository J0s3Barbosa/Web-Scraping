var request = require("request");
var urlBaseexchangeratesapi = "https://api.exchangeratesapi.io";
const CurrencyExchange = require("../models/currencyExchange");
const querystring = require("querystring");

exports.GetAll = function(req, res) {
  CurrencyExchange.find({}, (err, currencyExchange) => {
    if (err) {
      res.send(err);
    }
    res.json(currencyExchange);
  }).catch(function(err) {
    return err;
  });
};

exports.Convert =  function(req, res) {
  CurrencyExchange.from = req.query.from;
  CurrencyExchange.to = req.query.to;
  CurrencyExchange.value = 0;

  if (
    CurrencyExchange.from == null ||
    CurrencyExchange.from == undefined ||
    CurrencyExchange.from.length == 0 ||
    CurrencyExchange.to == null ||
    CurrencyExchange.to == undefined ||
    CurrencyExchange.to.length == 0
  ) {
    res.json({
      message: "You need to informe the Currencies /?from=xxx&to=xxx"
    });
  }

  CurrencyConvert(CurrencyExchange.from, CurrencyExchange.to)
    .then(function(body) {
      CurrencyExchange.value = round(body.result);
      console.log(currencyExchange)
  

      res.json(CurrencyExchange.value);
    })
    .catch(function(err) {
      return err;
    });
};

function round(num) {
  if (num == null) return null;
  return Math.round(num * 100) / 100;
}

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
