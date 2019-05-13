var express = require('express');
var router = express.Router();
var youtubeController = require('../controllers/youtubeController');
var ws = require('../modulos/ws');
var request = require('request');
var cheerio = require('cheerio');
var sendEmail = require('../modulos/sendEmail');


var fileController = require('../controllers/fileController');
const path = require('path');
const fs = require('fs');
var fileupload_path = path.join('public/fileupload/');
const url = require('url');

var app_versionController = require('../controllers/app_versionController');


router.get('/chatbot', (req, res) => res.render('pages/chatbot'))
router.get('/sendEmail', sendEmail.SendEmailDefault);
router.get('/youtubeClickAndGetPrint', youtubeController.youtubeClickAndGetPrint);
router.get('/ws', ws);
router.get('/webScrapingTest', (req, res) => {
    getData()
        .then(function (body) {
            res.send(body)
        })

})
function getData() {
    return new Promise(function (resolve, reject) {
        request('https://news.ycombinator.com', function (err, response, body) {
            if (err) reject(err);
            if (response.statusCode !== 200) {
                reject('Invalid status code: ' + response.statusCode);
            }
            let $ = cheerio.load(body);
            let channelList = $('span.comhead');

            let channels = [];

            for (let i = 0; i < channelList.length; i++) {
                let t = channelList.get(i);
                let channel = $(t).text();
                let artistNode = $(t).next();
                let artist = $(artistNode).text();
                let title = $(artistNode).next().text();
                channels.push({ channel: channel, artist: artist, title: title });
            }

            resolve(channels);

        });
    });
}

   router.post('/fileupload', fileController.fileupload);
router.post('/clearFold', fileController.clearFold);

router.get('/listoffiles', function(req, res) {
    var lstFiles = []
fs.readdir(fileupload_path, function (err, files) {
    if (err) {
        return res.json({ErrorMessage : 'Unable to scan directory: ' + err});
    } 
    files.forEach(function (file) {
        var filed = req.protocol+"://"+req.headers.host + url.resolve('/fileupload/', file) 
        lstFiles.push(filed)
    });

      
    res.json({lstFiles : lstFiles});
});

});

router.get('/download', function(req, res){
    var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
    res.download(file); // Set disposition and send it.
  });

router.get('/uploadfiles', (req, res) => res.render('pages/uploadfiles'
))
 
router.get('/appversion', (req, res) => res.render('pages/index_app_version'
))
router.post('/newappversion', app_versionController.post_version);
router.post('/postnewappversion', app_versionController.post_new_version);
router.get('/getappversion', app_versionController.getAll);
    
module.exports = router;



  