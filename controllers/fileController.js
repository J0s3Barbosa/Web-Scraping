var fs = require("fs");
var path = require('path');
var writePath = path.join("public/fileupload/");
var async = require('async');


var multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, writePath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const multerupload = multer({ storage });

exports.fileupload =multerupload.any();
// exports.fileupload = function (req, res) {
  

  // var filesArray = req.files;
  // if (filesArray.length > 0) {
  //   async.each(filesArray, function (file, eachcallback) {
  //     async.waterfall([
  //       function (callback) {
  //         fs.readFile(file.path, (err, data) => {
  //           if (err) {
  //             console.log("err ocurred", err);
  //           }
  //           else {
  //             callback(null, data);
  //           }
  //         });
  //       },
  //       function (data, callback) {
  //         fs.writeFile(writePath + file.originalname, data, (err) => {
  //           if (err) {
  //             console.log("error occured", err);
  //           }
  //           else {
  //             callback(null, 'success');

  //           }
  //         });
  //       }
  //     ], function (err, result) {
  //       // result now equals 'done'
  //       //pass final callback to async each to move on to next file
  //       eachcallback();

  //     });
  //   }, function (err) {
  //     if (err) {
  //       console.log("error ocurred in each", err);
  //     }
  //     else {
  //       console.log("finished prcessing");

  //       var message = "files uploaded successfully"
  //       res.json({ message }
  //       )

  //     }


  //   });
  // }

// }


exports.clearFold = function (req, res) {
  var file = req.body.file;
  var file_name = writePath + file.split('/')[4]
  var path = decodeURIComponent(file_name)

  fs.unlink(path, function (err) {
    if (err) {
      return res.json('error! ' + err);
    }
    console.log('File deleted!');
    res.json('File deleted!');

  });


}
