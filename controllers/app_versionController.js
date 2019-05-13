var App_version = require("../models/app_version");

exports.default = function (req, res) {

  var version_Objectsample = {
    version: "1",
  }
  res.json(version_Objectsample);
};

exports.getAll = function (req, res) {
  App_version.find({}, (err, app_version) => {
    if (err) {
      res.send(err);
    }
    res.json(app_version);
  }).catch(function (err) {
    return err;
  });
};
 
  
exports.post_new_version = function (req, res) {
  try {
    let new_version = new App_version(req.body);
      new_version.save((error, app_version) => {
        if (error) {
          return error;
        }
        if (
          app_version != "" ||
          app_version != undefined ||
          app_version != "undefined"
        ) {
          res.json(app_version);
        }
      });

  } catch (error) {
    res.json(error);
  }
};
exports.post_version = function (req, res) {
  try {
    let new_version = new App_version(req.body);

    App_version.findOne({}, {}, { sort: { 'Deployed_at': -1 } }, function (err, last_app_version) {
      if (err) res.send(err);
      if(last_app_version != null){
        new_version.version = last_app_version.version + 1 ;
      }
      else{
        new_version.version = 1 ;
      }

      new_version.save((error, app_version) => {
          if (error) {
            return error;
          }
          if (
            app_version != "" ||
            app_version != undefined ||
            app_version != "undefined"
          ) {
            res.json(app_version);
          }
        });

    }).catch(function (err) {
      res.send(err);
    });

  } catch (error) {
    res.json(error);
  }
};

exports.app_version_Interface = function (req, res) {
  try {
    res.render("pages/index_app_version", {
      user: req.user
    });
  } catch (error) {
    console.log(error);
  }
};

 
