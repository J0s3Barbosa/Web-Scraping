var express = require('express');
var router = express.Router();
var youtubeController = require('../controllers/youtubeController');
var ws = require('../modulos/ws');
var request = require('request');
var cheerio = require('cheerio');

router.get('/youtubeClickAndGetPrint', youtubeController.youtubeClickAndGetPrint);
router.get('/ws', ws);

router.get('/webScrapingTest', (req, res) => {
    getData()
        .then(function (body) {
            console.log('Got the following body:', body)
            res.send(body)
        })

}
)

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
                //console.log(channel +'-'+ artist +'-'+ title);
                channels.push({ channel: channel, artist: artist, title: title });
            }

            resolve(channels);

        });
    });
}


module.exports = router;
