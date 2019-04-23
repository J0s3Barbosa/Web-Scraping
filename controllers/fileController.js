var fs = require("fs");
var path = require('path');
var writePath = path.join('public/fileupload/');
var cmd=require('node-cmd');
var async = require('async');
var jsonfile = require('jsonfile');

exports.fileupload = function(req,res){
  var filesArray = req.files;
        async.each(filesArray,function(file,eachcallback){
        async.waterfall([
        function (callback) {
          fs.readFile(file.path, (err, data) => {
            if (err) {
              console.log("err ocurred", err);
              }
            else {
              callback(null,data);
            }
            });
        },
        function (data, callback) {
          fs.writeFile(writePath + file.originalname, data, (err) => {
          if (err) {
            console.log("error occured", err);
          }
          else {
          callback(null, 'success');
          }
          });
        },
        function (arg1, callback) {
          var filepath = './userdata/userid.json'
            jsonfile.readFile(filepath, function(err, obj) {
              callback(null,'done')
            })

        }
        ], function (err, result) {
          // result now equals 'done'
          //pass final callback to async each to move on to next file
          eachcallback();
        });
        },function(err){
          if(err){
              console.log("error ocurred in each",err);
          }
          else{
            console.log("finished prcessing");
            res.send({
                      "code":"200",
                      "success":"files uploaded successfully"
                      })
            cmd.run('rm -rf ./fileupload/*');
          }
          });
}

 