var request = require("request");
var DhtSensor = require("../models/dht");
const querystring = require("querystring");

exports.default = function(req, res) {
  
    var result = { 
      Message: 'Wellcome to Dht sensor API!',
      Link: 'http://localhost:5000/api/v1/dhtsensorhouse/'
  }
    res.json(result);
};

exports.getAllData = function(req, res) {
  DhtSensor.find({}, (err, dhtsensor) => {
    if (err) {
      res.send(err);
    }
    res.json(dhtsensor);
  }).catch(function(err) {
    return err;
  });
};

function save(req, res, dhtsensorObj) {
  try {
    let newdhtsensor = new DhtSensor(dhtsensorObj);
    newdhtsensor.save((error, dhtsensor) => {
      if (error) {
        return error;
      }
      res.status(201).json(dhtsensor);
    });
  } catch (error) {
    res.json(error);
  }
}

exports.SaveData = function(req, res) {
    var dhtsensorObj = {
      temperature: "",
      humidity: ""
  };
  dhtsensorObj.temperature = req.query.temperature;
  dhtsensorObj.humidity = req.query.humidity;

  if (
    dhtsensorObj.temperature == null ||
    dhtsensorObj.temperature == undefined ||
    dhtsensorObj.temperature.length == 0 ||
    dhtsensorObj.humidity == null ||
    dhtsensorObj.humidity == undefined ||
    dhtsensorObj.humidity.length == 0
  ) {
    res.json({
      message: "You need to pass data"
    });
  }
  save(req, res, dhtsensorObj);

};



