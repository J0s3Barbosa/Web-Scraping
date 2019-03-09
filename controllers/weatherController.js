const request_promise = require("request-promise");
const $ = require("cheerio");
const webScrapObj = require("../models/webScrapingobj");

var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

exports.weatherWebScraping = function(req, res) {
  res.render("pages/weatherWebScraping");
};

exports.webscraping = function(req, res) {
  const urlpraiaitacoatiarasurfguru =
    "http://pt.surf-forecast.com/breaks/Itacoatiara/forecasts/latest";
  const urlItacoatiaraseatemp =
    "http://pt.surf-forecast.com/breaks/Itacoatiara/seatemp";
  webScraping(
    urlpraiaitacoatiarasurfguru,
    urlItacoatiaraseatemp,
    "tbody b",
    ".day-end b",
    ".swell-icon-val",
    ".swell-symbol-cell"
  );
  res.json(webScrapObj);
};

exports.Itacoatiaraseatemp = function(req, res) {
  Itacoatiaraseatemp().then(function(body) {
    res.send(body);
  });
};

exports.Itacoatiara48forecast = function(req, res) {
  Itacoatiara48forecast()
    .then(function(body) {
      // fs.appendFile('table.ejs', body, function (err) {
      //     if (err) throw err;
      //     console.log('table.ejs Saved!');
      //   });
      res.send(body);
    })
    .catch(function(err) {
      // Crawling failed...
      console.log("err: ", err);
    });
};

function Itacoatiara48forecast() {
  const urlItacoatiaraforecast =
    "http://pt.surf-forecast.com/breaks/Itacoatiara/forecasts/latest";
  return new Promise(function(resolve, reject) {
    request(urlItacoatiaraforecast, function(err, response, body) {
      if (err) reject(err);
      if (response.statusCode !== 200) {
        reject("Invalid status code: " + response.statusCode);
      }
      let $ = cheerio.load(body);
      // let channelList = $('.day-end');
      let day1 = $(".day-end")
        .eq(0)
        .text();
      let day2 = $(".day-end")
        .eq(1)
        .text();
      let day3 = $(".day-end")
        .eq(2)
        .text();
      var days = day1 + ", " + day2 + ", " + day3 + "";

      // let hea1 = $('.cell').text()
      // var regexPM = /PM/gi;
      // var regexAM = /AM/gi;
      // var hea1change = hea1.replace(regexPM, 'PM ').replace(regexAM, 'AM ')

      let weather = [];
      let wphrase = $(".wphrase ");
      for (let i = 0; i < wphrase.length; i++) {
        let t = wphrase.get(i);
        let weatherphase = $(t).text();
        weather.push(weatherphase);
      }
      var weather_resume = "";
      var uniqueweather = removeDups(weather);
      if (uniqueweather > 1) {
        weather_resume = uniqueweather;
      }

      let swell = $(".swell-symbol-cell ").text();

      let swellwaves = $(".swell-symbol-cell ");
      let waves = [];
      for (let i = 0; i < swellwaves.length; i++) {
        let t = swellwaves.get(i);
        let eachwavesize = $(t).text();
        // var key = "Key" + i;
        // var obj = {};
        // obj[key] = eachwavesize;
        waves.push(eachwavesize);
      }

      let time = $(".cell ");
      let times = [];
      for (let i = 0; i < time.length; i++) {
        let t = time.get(i);
        let eachTime = $(t).text();
        if (eachTime != "") {
          times.push(eachTime);
        }
      }

      var uniquetimes = [];
      uniquetimes = removeDups(times);

      var count = 0;
      let newtimes = [];
      let dayss = [day1, day2, day3];

      for (let d = 0; d < dayss.length; d++) {
        for (let index = 0; index < waves.length; index++) {
          var objWaveForecast = {
            day: "",
            time: "",
            wavesize: "",
            weather: ""
          };

          var regexAM = /[^\d.-]/g;
          var NumberOnly = times[index].replace(regexAM, "");

          if (NumberOnly == 0 && count != 0) {
            times.splice(0, count);
            count = 0;
            break;
          }
          if (NumberOnly == 0 && count == 0) {
          objWaveForecast.time = times[index];

            count++;
          } else {
          objWaveForecast.time = times[index];

            count++;
          }


          objWaveForecast.day = dayss[d];
          objWaveForecast.wavesize = waves[index];
          objWaveForecast.weather = weather[index];
  
          newtimes.push(objWaveForecast);
        }
      }

      let wavesTimes = [];
      var days = [day1, day2, day3];

      for (let index = 0; index < waves.length; index++) {
        var objWaveForecast = {
          day: "",
          time: "",
          wavesize: "",
          weather: ""
        };

        // objWaveForecast.day = days[d];
        objWaveForecast.time = times[index];
        objWaveForecast.wavesize = waves[index];
        objWaveForecast.weather = weather[index];
        wavesTimes.push(objWaveForecast);
      }

      let channels = [];

      channels.push({ days, newtimes, uniqueweather, wavesTimes });
      resolve(channels);
    });
  });
}

function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function Itacoatiaraseatemp() {
  const urlItacoatiaraseatemp =
    "http://pt.surf-forecast.com/breaks/Itacoatiara/seatemp";
  return new Promise(function(resolve, reject) {
    request(urlItacoatiaraseatemp, function(err, response, body) {
      if (err) reject(err);
      if (response.statusCode !== 200) {
        reject("Invalid status code: " + response.statusCode);
      }
      let $ = cheerio.load(body);
      let temp = $("tbody b")
        .eq(0)
        .text();

      let channels = [];

      channels.push({ temp: temp });

      resolve(channels);
    });
  });
}

function webScraping(
  url,
  urltemp,
  toSearchTemp,
  toSearch,
  toSearch2,
  toSearch3
) {
  request_promise(urltemp).then(function(html) {
    //success!
    var webscrapresult = $(toSearchTemp, html).text();
    webScrapObj.temp = webscrapresult.replace(
      "Brazil\n              \n              Temperaturas da água à superfícieBrazil \n              Anomalias na emperatura dos oceanos",
      ""
    );
  });

  request_promise(url)
    .then(function(html) {
      //success!
      var webscrapresult = $(toSearch, html).html();
      webScrapObj.day = webscrapresult;
    })
    .catch(function(err) {
      // Crawling failed...
    });
  request_promise({ uri: url, resolveWithFullResponse: true })
    .then(function(html) {
      //success!
      // console.log(html.statusCode, html.body)
      var webscrapresult = $(toSearch2, html.body).html();
      webScrapObj.wavesSize = webscrapresult;
    })
    .catch(function(err) {
      // Crawling failed...
    });
  request_promise(url)
    .then(function(html) {
      //success!
      var webscrapresult = $(toSearch3, html).text();
      webScrapObj.wavesSizeDetailed = webscrapresult;
    })
    .catch(function(err) {
      // Crawling failed...
    });
}
