const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
// var clashRoutes = require('./routes/clashRoutes');

const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise;
var dbmlabUrl = 'mongodb://appchto:Password!1@ds237574.mlab.com:37574/node'
mongoose.connect(dbmlabUrl ,{ useNewUrlParser: true });
var connection = mongoose.connection;

connection.on("open", function (err) {
  if (err) {
      console.log("Error on connectiong " + err); // it will print your collection data
  }
  console.log("mongodb is connected!!");
});
var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app .set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app .get('/cr', (req, res) => res.render('pages/indexcr'))
app .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  // app.use('/c', clashRoutes);
