const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var clashRoutes = require('./routes/clashRoutes');
var weatherRoutes = require('./routes/weatherRoutes');
var indexRouters = require('./routes/indexRouters');
// var db = require('./modulos/db');
const ensureAuthenticated = require('./config/auth');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
const morgan = require("morgan");

var router_user = require('./routes/user');

const PORT = process.env.PORT || 5000
const API_PATH = '/api/v1'

// Passport Config
// require('./config/passport')(passport);

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
app.use(flash());


// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.flash('user');
  res.locals.usertoken = req.flash('usertoken');
  next();
});


// express()
app.use(express.static(path.join(__dirname, 'public')))

  // EJS
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(expressLayouts)
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => res.render('pages/login'))

  .use(API_PATH + '/clashRoyale', clashRoutes)
  .use(API_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/youtube', indexRouters)
  .use(API_PATH + '/default', indexRouters)
  .use('/user', router_user)

  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// Dashboard
app.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('pages/dashboard', {
    user: req.user
  })
);

app.get('/signup', (req, res) => res.render('pages/register'));



// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// handle errors
app.use(function (err, req, res, next) {
  console.log('---------err----------');
  console.log(err);
  console.log('--------end err-----------');
  res.render('pages/error', {
    error: err
  })

})

