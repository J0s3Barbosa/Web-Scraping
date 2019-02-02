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
const jwt = require('jsonwebtoken');

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


  .use((req, res, next) => {
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
  })

  .use(API_PATH + '/clashRoyale', clashRoutes)
  .use(API_PATH + '/weather', weatherRoutes)
  .use(API_PATH + '/youtube', indexRouters)
  .use(API_PATH + '/default', indexRouters)



  // .use(function (req, res) {
  //   req.flash('ErrorMsg', 'Something went wrong !');
  //   // res.redirect('/');
  //   //  next()
  // })

  .post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  })

  .post('/api/login', (req, res) => {
    // Mock user
    const user = {
      id: 1,
      username: 'brad',
      email: 'brad@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token
      });
    });
  })

 

  .listen(PORT, () => console.log(`Listening on ${PORT}`));

   // handle 404 error
    app.use(function (req, res, next) {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    })
    // handle errors
    app .use(function (err, req, res, next) {
      console.log('---------err----------');
      console.log(err);
      console.log('--------end err-----------');
  
      if (err.status === 404)
        res.status(404).json({ message: "Not found" });
      else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
    })


// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}