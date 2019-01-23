const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
var clashRoutes = require('./routes/clashRoutes');
var bodyParser = require('body-parser')


const request_promise = require('request-promise');
const $ = require('cheerio');
var webScrapObj = require('./models/webScrapingobj')


const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise;
var dbmlabUrl = 'mongodb://appchto:Password!1@ds237574.mlab.com:37574/node'
mongoose.connect(dbmlabUrl, { useNewUrlParser: true });
var connection = mongoose.connection;

connection.on("open", function (err) {
  if (err) {
    console.log("Error on connectiong " + err); // it will print your collection data
  }
  console.log("mongodb is connected!!");
});

var app = express();
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// express()
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

  .get('/cr', (req, res) => {
    var drinks = []

    res.render('pages/indexcr', {
      drinks: drinks
    })
  })

  .get('/webscraping', (req, res) => {
    const urlpraiaitacoatiarasurfguru = 'http://pt.surf-forecast.com/breaks/Itacoatiara/forecasts/latest';
    const urlItacoatiaraseatemp = 'http://pt.surf-forecast.com/breaks/Itacoatiara/seatemp';

    webScraping(urlpraiaitacoatiarasurfguru,urlItacoatiaraseatemp, 'tbody b','.day-end b', '.swell-icon-val','.swell-symbol-cell');

    res.json(webScrapObj)
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use('/c', clashRoutes);

function webScraping(url,urltemp, toSearchTemp, toSearch, toSearch2, toSearch3) {
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
      webScrapObj.day =  webscrapresult
    })
    request_promise(url)
    .then(function (html) {
      //success!
      var webscrapresult = $(toSearch2, html).html();
      webScrapObj.wavesSize =  webscrapresult
    } )
    request_promise(url)
    .then(function (html) {
      //success!
      var webscrapresult = $(toSearch3, html).text();
      webScrapObj.wavesSizeDetailed =  webscrapresult
    } )
} 
 