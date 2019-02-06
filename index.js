const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var clashRoutes = require('./routes/clashRoutes');
var weatherRoutes = require('./routes/weatherRoutes');
var indexRouters = require('./routes/indexRouters');
// var db = require('./modulos/db');
const ensureAuthenticated = require('./config/auth');
// var users = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
const morgan = require("morgan");  
const cookieParser = require("cookie-parser");  
const User = require("./models/User");  

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

var app = express();
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));  

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// For Sessions  
app.use(cookieParser());  
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
  .get('/', (req, res) => res.render('pages/index'))

  // Welcome Page
  // .get('/welcome', (req, res) => res.render('pages/welcome'))

  // // Dashboard
  // .get('/dashboard', ensureAuthenticated, (req, res) =>
  //   res.render('pages/dashboard', {
  //     user: req.user
  //   })
  // )

  // .use('/users', users)
  .use(API_PATH + '/clashRoyale', clashRoutes)
  .use(API_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/youtube', indexRouters)
  .use(API_PATH + '/default', indexRouters)




  .listen(PORT, () => console.log(`Listening on ${PORT}`));
  require("./config/passport")(passport);  
  require("./routes/users")(app, passport);  
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
  // if (err.status === 404)
  //   res.status(404).json({ message: "Not found" });
  // else
  //   res.status(500).json({ message: "Something looks wrong :( !!!" });
})

