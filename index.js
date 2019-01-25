const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
var clashRoutes = require('./routes/clashRoutes');
var bodyParser = require('body-parser')

const request_promise = require('request-promise');
const $ = require('cheerio');
var webScrapObj = require('./models/webScrapingobj')
const cheerio = require('cheerio');

var jsonparser = require('json-parser');


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
  .get('/weatherWebScraping', (req, res) => res.render('pages/weatherWebScraping'))

  .get('/cr', (req, res) => {
    try {

      res.render('pages/indexcr')
    } catch (error) {
      console.log(error)
    }

  })

  .get('/webscraping', (req, res) => {
    const urlpraiaitacoatiarasurfguru = 'http://pt.surf-forecast.com/breaks/Itacoatiara/forecasts/latest';
    const urlItacoatiaraseatemp = 'http://pt.surf-forecast.com/breaks/Itacoatiara/seatemp';

    webScraping(urlpraiaitacoatiarasurfguru, urlItacoatiaraseatemp, 'tbody b', '.day-end b', '.swell-icon-val', '.swell-symbol-cell');

    res.json(webScrapObj)
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use('/c', clashRoutes);

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

var obj = [];

app.get('/clashroyaleapi', (req, res) => {
  try {
    var clashRoyaleUrl = ["https://statsroyale.com/profile/9JUUVGLQQ",
      "https://statsroyale.com/profile/9UG2R28R2",
      "https://statsroyale.com/profile/QCYVUL",
      "https://statsroyale.com/profile/2R900UR",
      "https://statsroyale.com/profile/UULQLJU",
      // "https://statsroyale.com/profile/2R900UR/decks?type=ladder",

    ];
    var test1 = null
    clashRoyaleUrl.forEach(element => {
      test1 = clashroyaleStatus(element)
    });
    res.json(test1);
  } catch (error) {
    console.log(error)
  }

})


function clashroyaleStatus(clashRoyaleUrl) {
  try {

    const options = {
      uri: clashRoyaleUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    request_promise(options)
      .then(($) => {
        var Player = $('.profileHeader__nameCaption').eq(0).text();
        var Highest_Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(0).html();
        var Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(1).html();
        var userLevel = $('.profileHeader__userLevel').html();
        var favouriteCardName = $('.profile__favouriteCardName').html();
        // var Winrate = $('.decks__metricValue').html();
        var crStatusObj = {
          Player: String,
          Highest_Trophies: Number,
          Trophies: Number,
          userLevel: Number,
          favouriteCardName: String
        }
        crStatusObj.Player = Player.replace('\n', ''),
          crStatusObj.Highest_Trophies = Highest_Trophies,
          crStatusObj.Trophies = Trophies,
          crStatusObj.userLevel = userLevel,
          crStatusObj.favouriteCardName = favouriteCardName
        // 'Winrate': Winrate,

        if (obj.length == 0) {
          obj.push(crStatusObj);
        }
        else if (obj.length > 0) {
          var playerexists = false
          obj.forEach(element => {
            if (element.Player === crStatusObj.Player) {
              playerexists = true
            }
          });
          if (!playerexists) {
            obj.push(crStatusObj);
          }

        }
        // var objfill = {
        //   'Player': Player.replace('\n', ''),
        //   'Highest_Trophies': Highest_Trophies,
        //   'Trophies': Trophies,
        //   'userLevel': userLevel,
        //   'favouriteCardName': favouriteCardName,
        //   // 'Winrate': Winrate,
        // };

        // if (obj.length == 0) {
        //   obj.push(objfill);
        // }
        // else if (obj.length > 0) {

        //   var playerexists = false
        //   obj.forEach(element => {
        //     if (element.Player === objfill.Player) {
        //       playerexists = true
        //     }
        //   });
        //   if (!playerexists) {
        //     obj.push(objfill);
        //   }

        //  }

      })

  } catch (error) {
    console.log(error)
  }
  return obj

}