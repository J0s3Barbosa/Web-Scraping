const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session');
var flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const morgan = require("morgan");


var clashRoutes = require('./routes/clashRoutes');
var weatherRoutes = require('./routes/weatherRoutes');

var clashApiRoutes = require('./routes/clashApiRoutes');
var weatherApiRoutes = require('./routes/weatherApiRoutes');
var users = require('./routes/users');
var currencyExchangeRoutes = require('./routes/currencyExchangeRoutes');
var dhtsensorRoutes = require('./routes/dhtsensorRoutes');
var indexRouters = require('./routes/indexRouters');

const { fork } = require('child_process');

const PORT = process.env.PORT || 5000
const API_PATH = '/api/v1'
const APP_PATH = '/app'

require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

var app = express();
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// For Sessions  
app.use(session({
  secret: 'secretkey',
  saveUninitialized: true,
  resave: true

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.flash('user');
  next();
});


// express()
app.use(express.static(path.join(__dirname, 'public')))

  // EJS
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(expressLayouts)
  .get('/', (req, res) => res.render('pages/index', {
    user : req.user
  }))
  
  .use(APP_PATH + '/clashRoyale', clashRoutes)
  .use(API_PATH + '/clashRoyale', clashApiRoutes)
  .use(APP_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/weather', weatherApiRoutes)
  .use('/users', users )
  .use('/currencyExchange', currencyExchangeRoutes )
  .use(API_PATH +'/dhtsensorhouse', dhtsensorRoutes )
 .use('/indexRouters', indexRouters )
  
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// handle errors
app.use(function (err, req, res, next) {
  res.render('pages/error', {
    error: err
  })

})

  fork('./apis.js');
