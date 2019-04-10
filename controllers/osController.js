var request = require("request");
var Os = require("../models/os");
const querystring = require("querystring");

exports.default = function (req, res) {

  var osObjectsample = {
    id_OS: "",
    id_equipamento: "",
    id_func: "",
    texto_defeito: "",
    texto_realizado: "",
    dh_criacao: "",
    dh_inicio: "",
    dh_fm: ""
  }
  res.json(osObjectsample);
};

exports.getAll = function (req, res) {
  Os.find({}, (err, os) => {
    if (err) {
      res.send(err);
    }
    res.json(os);
  }).catch(function (err) {
    return err;
  });
};

exports.os_post = function(req, res) {
  try {
    let newOs = new Os(req.body);

    newOs.save((error, os) => {
      if (error) {
        return error;
      }
      if (
        os != "" ||
        os != undefined ||
        os != "undefined"
      ) {
        res.json(os);
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.os_update = function(req, res) {
  try {
    Os.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function(err, os) {
        if (err) res.send(err);
        res.json(os);
      }
    );
  } catch (error) {
    res.json(error);
  }
};

exports.os_delete = function(req, res) {
  try {
    Os.findByIdAndRemove(req.params.id, function(err, os) {
      if (err) res.send(err);
      res.json(os);
    });
  } catch (error) {
    res.json(error);
  }
};

