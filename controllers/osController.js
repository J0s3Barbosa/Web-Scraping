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
    os_status: "os_status",
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

exports.search = function (req, res) {

  var id_OS = req.query.id_OS;
  var os_status = req.query.os_status;
  var myfind = null;


  if ((id_OS == (null || undefined || '')
    || os_status == (null || undefined || ''))
  ) {

    let message = 'You need to pass the Param to be searched!'
    res.json({
      message
    });
  }

  else {
    if (id_OS != (null || undefined)) {
      myfind = { id_OS };
    }
    else if (os_status != (null || undefined)) {
      myfind = { os_status };
    }
    Os.find(myfind, (err, os) => {
      if (err) {
        res.send(err);
      }
      if (os.length == 0) {
        let message = 'Didnt find any OS!'
        res.send({ message });
      }
      else {
        res.json(os);
      }
    }).catch(function (err) {
      res.send(err);
    });


  }


};
exports.getOsByStatus = function (req, res) {

  var myfind = req.query.os_status;

  if (
    myfind == null ||
    myfind == undefined ||
    myfind.length == 0
  ) {

    let message = 'You need to pass os_status!'
    res.json({
      message
    });
  }
  else if (myfind != undefined || myfind != null) {


    myfind = { os_status: myfind };

    Os.find(myfind, (err, os) => {
      if (err) {
        res.send(err);
      }
      if (os.length == 0) {
        let message = 'Didnt find any status!'
        res.send({ message });
      }
      else {
        res.json(os);
      }
    }).catch(function (err) {
      res.send(err);
    });

  }


};
exports.os_post = function (req, res) {
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
exports.os_update = function (req, res) {
  try {
    Os.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, os) {
        if (err) res.send(err);
        res.json(os);
      }
    );
  } catch (error) {
    res.json(error);
  }
};
exports.os_delete = function (req, res) {
  try {
    Os.findByIdAndRemove(req.params.id, function (err, os) {
      if (err) res.send(err);
      res.json(os);
    });
  } catch (error) {
    res.json(error);
  }
};
exports.get_one = function (req, res) {

  var myfind = req.params.id;

  if (myfind == null || myfind == undefined) {
    let message = 'You need to pass the OS number!'
    res.json({
      message
    });
  }
  else if (myfind != undefined || myfind != null) {
    myfind = { _id: myfind };

    Os.find(myfind, (err, os) => {
      if (err) {
        res.send(err);
      }
      if (os.length == 0) {
        let message = 'No OS found!'
        res.send({ message });
      }
      else {
        res.json(os);
      }
    }).catch(function (err) {
      res.send(err);
    });

  }

};
exports.osInterface = function (req, res) {
  try {
    res.render("pages/index_os", {
      user: req.user
    });
  } catch (error) {
    console.log(error);
  }
};