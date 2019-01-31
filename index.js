const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var clashRoutes = require('./routes/clashRoutes');
var weatherRoutes = require('./routes/weatherRoutes');
var indexRouters = require('./routes/indexRouters');
var db = require('./modulos/db');
var sendEmail = require('./modulos/sendEmail');
var session = require('express-session');
var flash = require('req-flash');

const PORT = process.env.PORT || 5000
const API_PATH = '/api/v1'

var app = express();
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
// express()
app.use(express.static(path.join(__dirname, 'public')))


  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use(API_PATH + '/clashRoyale', clashRoutes)
  .use(API_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/youtube', indexRouters)
  .use(API_PATH + '/default', indexRouters)
  // .use(function ( req, res, next) {
  //   if (res.status(404)) {
  //     sendEmail.SendEmailError(res.statusMessage)
  //     res.status(404)
  //     .send('Sorry cant find that!')
  //   }
  //   ;
  // })

  .use(function (req, res) {
    req.flash('ErrorMsg', 'Something went wrong !');
    res.redirect('/');
    //  next()
  })


  .listen(PORT, () => console.log(`Listening on ${PORT}`));


