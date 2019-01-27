const request_promise = require('request-promise')
const $ = require('cheerio')
const webScrapObj = require('../models/webScrapingobj')

exports.weatherWebScraping = function (req, res) {
    res.render('pages/weatherWebScraping')
};

exports.webscraping = function (req, res) {
    const urlpraiaitacoatiarasurfguru = 'http://pt.surf-forecast.com/breaks/Itacoatiara/forecasts/latest';
    const urlItacoatiaraseatemp = 'http://pt.surf-forecast.com/breaks/Itacoatiara/seatemp';
    webScraping(urlpraiaitacoatiarasurfguru, urlItacoatiaraseatemp, 'tbody b', '.day-end b', '.swell-icon-val', '.swell-symbol-cell');

    res.json(webScrapObj)
};

function webScraping(url, urltemp, toSearchTemp, toSearch, toSearch2, toSearch3) {
    request_promise(urltemp)
      .then(function (html) {
        //success!
        var webscrapresult = $(toSearchTemp, html).text();
        webScrapObj.temp = webscrapresult.replace('Brazil\n              \n              Temperaturas da água à superfícieBrazil \n              Anomalias na emperatura dos oceanos', '')
      })
  
    request_promise(url)
      .then(function (html) {
        //success!
        var webscrapresult = $(toSearch, html).html();
        webScrapObj.day = webscrapresult
      })
    request_promise(url)
      .then(function (html) {
        //success!
        var webscrapresult = $(toSearch2, html).html();
        webScrapObj.wavesSize = webscrapresult
      })
    request_promise(url)
      .then(function (html) {
        //success!
        var webscrapresult = $(toSearch3, html).text();
        webScrapObj.wavesSizeDetailed = webscrapresult
      })
  }