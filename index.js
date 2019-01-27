const express = require('express')
const path = require('path')
var clashRoutes = require('./routes/clashRoutes');
var weatherRoutes = require('./routes/weatherRoutes');
var db = require('./modulos/db');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const API_PATH = '/api/v1'

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
  .use(API_PATH+'/clashRoyale', clashRoutes)
  .use(API_PATH+'/weather', weatherRoutes)

  .listen(PORT, () => console.log(`Listening on ${PORT}`));


