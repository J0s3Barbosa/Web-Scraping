const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var weatherRoutes = require('./routes/weatherRoutes');
var indexRouters = require('./routes/indexRouters');
var session = require('express-session');
var flash = require('connect-flash');
const mongoose = require('mongoose');
const morgan = require("morgan");

const API_PATH = '/api/v1'

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
  next();
});


// express()
app.use(express.static(path.join(__dirname, 'public')))

  .use(API_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/youtube', indexRouters)
  .use(API_PATH + '/default', indexRouters)

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})
 
const port = parseInt( "5002");
const server = require("http").createServer(app);
server.listen(port);
console.log(`advice service running on port ${port}`);
