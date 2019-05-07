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
    Os.findOne({}, {}, { sort: { 'dh_criacao': -1 } }, function (err, last_os) {
      if (err) res.send(err);
      if(last_os != null){
        newOs.id_OS = last_os.id_OS + 1 ;
      }
      else{
        newOs.id_OS = 1 ;
      }

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

    }).catch(function (err) {
      res.send(err);
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
exports.os_update_dt_inicio = function (req, res) {
  try {
    let dt_in = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    var initialDate = Date.parse(dt_in)
    var id = req.params.id;
    Os.findById(
      id
      , function (err, os) {
        if (err) res.send(err);
        if (os.dh_inicio != undefined || os.dh_inicio != null) {
          res.status(400).json({ error: 'Os Alread started' });
        }
        else {

          Os.findByIdAndUpdate(
            id,
            { $set: { 'dh_inicio': initialDate } },
            { new: true },
            function (err, os) {
              if (err) res.send(err);
              res.json(os);
            }
          );

        }
      }
    );

  } catch (error) {
    res.json(error);

  }

};
exports.os_update_dt_fim = function (req, res) {
  try {
    let dt_in = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    var finished_date = Date.parse(dt_in)
    var id = req.params.id;
    Os.findById(
      id
      , function (err, os) {
        if (err) res.send(err);
        if (os.dh_fm != undefined || os.dh_fm != null) {
          res.status(400).json({ error: 'Os Alread Finished' });
        }
        else {

          Os.findByIdAndUpdate(
            id,
            { $set: { 'dh_fm': finished_date } },
            { new: true },
            function (err, os) {
              if (err) res.send(err);
              res.json(os);
            }
          );

        }
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

exports.os_orderBy = function (req, res) {
  var mysort = "";
  var orderby = req.params.orderby;

  switch (orderby) {
    case "id_OS":
      mysort = { id_OS: -1 };
      break;

    case "os_status":
      mysort = { os_status: -1 };
      break;

    default:
      mysort = { dh_criacao: -1 };
      break;
  }
  var myfind = "";
  if (req.user == undefined || req.user == null) {
    myfind = { Owner: "Owner" };
  } else if (req.user != undefined || req.user != null) {
    if (req.user.permission) {
      myfind = {};
    } else {
      myfind = { Owner: req.user.email };
    }
  }
  Os.find(myfind, function (err, os) {
    if (err) res.send(err);

    res.json(os);
  }).sort(mysort);
};

