var request = require("request");
var Os = require("../models/os");
const querystring = require("querystring");

exports.default = function (req, res) {

  var osObjectsample = {
    id_OS: "1",
    id_equipamento: "1",
    id_func: "1",
    texto_defeito: "texto_defeito",
    texto_realizado: "texto_realizado",
    dh_criacao: "01/01/2001",
    dh_inicio: "01/01/2001",
    dh_fm: "01/01/2001"
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

exports.getOsById = function (req, res) {

  var myfind = req.query.id_OS;

   if (
    myfind == null ||
    myfind == undefined ||
    myfind.length == 0 
  ) {
  
        let message = 'You need to pass the OS number!'
    res.json({
      message
    });
  }
 else if (myfind != undefined || myfind != null) {
      myfind = { id_OS: myfind };

      Os.find(myfind, (err, os ) => {
        if (err) {
          res.send(err);
        }
        if ( os.length == 0) {
          let message = 'No OS found!'
          res.send({message});
      }
      else{
        res.json(os);
      }
      }).catch(function (err) {
        res.send(err);
      });

  }


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

