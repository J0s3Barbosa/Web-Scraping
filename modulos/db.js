const mongoose = require('mongoose');

module.exports = mongoose.Promise = global.Promise;
var dbmlabUrl = 'mongodb://appchto:Password!1@ds237574.mlab.com:37574/node'
mongoose.connect(dbmlabUrl, { useNewUrlParser: true });
var connection = mongoose.connection;
connection.on("open", function (err) {
    if (err) {
        console.log("Error on connectiong " + err); // it will print your collection data
    }
    console.log("mongodb is connected!!");
});

