const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;

exports.DaApiSearch = async function(req, res) {
  AutomateClick();
 
};

exports.ObterDados = function(req, res) {
  ObterDados()
    .then(function(body) {
      // fs.appendFile('table.ejs', body, function (err) {
      //     if (err) throw err;
      //     console.log('table.ejs Saved!');
      //   });
      res.send(body);
    })
    .catch(function(err) {
      console.log("err: ", err);
    });
};

function ObterDados() {
  const paginaDividaAtiva =
    "https://www.dividaativa.pge.sp.gov.br/da-ic-web/";
  return new Promise(function(resolve, reject) {
    request(paginaDividaAtiva, function(err, response, body) {
      if (err) reject(err);
      if (response.statusCode !== 200) {
        reject("Invalid status code: " + response.statusCode);
      }
      let $ = cheerio.load(body);
      // let channelList = $('.day-end');
      let resp = $(".g-recaptcha")
        .eq(0)
        .text();
  
      let channels = [];

      channels.push({ resp, body});
      resolve(channels);
    });
  });
}


const siteDetails = {
  sitekey: '6LeTnxkTAAAAAN9QEuDZRpn90WwKk_R1TRW_g-JC',
  pageurl: 'https://old.reddit.com/login'
}

const apiKey = 'ee7bac3042252e027c46de5840fe2ffc';

const chromeOptions = {
  headless:false, 
  slowMo:10,
  defaultViewport: null
};


async function AutomateClick() {
  const browser = await puppeteer.launch(chromeOptions);

  const page = await browser.newPage();

  await page.goto('https://old.reddit.com/login');

  const requestId = await initiateCaptchaRequest(apiKey);

  await page.type('#user_reg', "chtowebscraping");

  await page.type('#passwd_reg', 'password');
  await page.type('#passwd2_reg', 'password');

  const response = await pollForRequestResults(apiKey, requestId);
  
  await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

  page.click('#register-form button[type=submit]');
}


async function getUsername(){

 return PickRandomWord();
}
var NumberOfWords = 28

var words = new BuildArray(NumberOfWords)

// Use the following variables to 
// define your random words:
words[1] = "escapology"
words[2] = "brightwork"
words[3] = "verkrampte"
words[4] = "protectrix"
words[5] = "nudibranch"
words[6] = "grandchild"
words[7] = "newfangled"
words[8] = "flugelhorn"
words[9] = "mythologer"
words[10] = "pluperfect"
words[11] = "jellygraph"
words[12] = "quickthorn"
words[13] = "rottweiler"
words[14] = "technician"
words[15] = "cowpuncher"
words[16] = "middlebrow"
words[17] = "jackhammer"
words[18] = "triphthong"
words[19] = "wunderkind"
words[20] = "dazzlement"
words[21] = "jabberwock"
words[22] = "witchcraft"
words[23] = "pawnbroker"
words[24] = "thumbprint"
words[25] = "motorcycle"
words[26] = "cryptogram"
words[27] = "torchlight"
words[28] = "bankruptcy"

function BuildArray(size){
  this.length = size
  for (var i = 1; i <= size; i++){
  this[i] = null}
  return this
  }
  
  function PickRandomWord() {
  // Generate a random number between 1 and NumberOfWords
  var rnd = Math.ceil(Math.random() * NumberOfWords)
  
  // Display the word inside the text box
  return words[rnd]
  }
 

async function initiateCaptchaRequest(apiKey) {
  const formData = {
    method: 'userrecaptcha',
    googlekey: siteDetails.sitekey,
    key: apiKey,
    pageurl: siteDetails.pageurl,
    json: 1
  };
  const response = await request.post('http://2captcha.com/in.php', {form: formData});
  return JSON.parse(response).request;
}

async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
  await timeout(delay);
  return poll({
    taskFn: requestCaptchaResults(key, id),
    interval,
    retries
  });
}

function requestCaptchaResults(apiKey, requestId) {
  const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
  return async function() {
    return new Promise(async function(resolve, reject){
      const rawResponse = await request.get(url);
      const resp = JSON.parse(rawResponse);
      if (resp.status === 0) return reject(resp.request);
      resolve(resp.request);
    });
  }
}

const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))
