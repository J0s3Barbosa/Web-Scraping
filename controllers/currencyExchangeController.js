var request = require("request");
var urlBaseexchangeratesapi = "https://api.exchangeratesapi.io";
var CurrencyExchange = require("../models/currencyExchange");
const querystring = require("querystring");

exports.default = function(req, res) {
  
    var result = {message: '/currencyExchange/Convert/?from=USD&to=BRL'}
    res.json(result);
};

exports.getAll = function(req, res) {
  CurrencyExchange.find({}, (err, currencyExchange) => {
    if (err) {
      res.send(err);
    }
    res.json(currencyExchange);
  }).catch(function(err) {
    return err;
  });
};

function save(req, res, currencyObj) {
  try {
    let newCurrencyExchange = new CurrencyExchange(currencyObj);
    newCurrencyExchange.save((error, currencyExchange) => {
      if (error) {
        return error;
      }
      res.status(201).json(currencyExchange);
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

exports.convertSave = function(req, res) {
    var currencyObj = {
    from: "",
    to: "",
    value: ""
  };
  currencyObj.from = req.query.from;
  currencyObj.to = req.query.to;
  currencyObj.value = req.query.to;

  if (
    currencyObj.from == null ||
    currencyObj.from == undefined ||
    currencyObj.from.length == 0 ||
    currencyObj.to == null ||
    currencyObj.to == undefined ||
    currencyObj.to.length == 0
  ) {
    res.json({
      message: "You need to informe the Currencies /?from=xxx&to=xxx"
    });
  }
  currencyConvert(currencyObj.from, currencyObj.to)
    .then(function(body) {
      currencyObj.value = round(body.result);
      save(req, res, currencyObj);
    })
    .catch(function(err) {
      return err;
    });
};

exports.convert = function(req, res) {
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
  currencyConvert(CurrencyExchange.from, CurrencyExchange.to)
    .then(function(body) {
      CurrencyExchange.value = round(body.result);
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

function currencyConvert(exchangeBaseFrom, exchangeTo) {
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
      var result = getPropValue(listOfRates, exchangeTo);

      resolve({ result });
    });
  });
}

function getPropValue(obj, objProp) {
  for (var i in obj) {
    if (obj.hasOwnProperty(objProp) && i == objProp) {
      return obj[i];
    }
  }
}
