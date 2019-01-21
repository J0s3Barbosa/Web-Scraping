const http = require('http');
var dt = require('./datetime');

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url+"<p>");
    res.write("The date and time are currently: " + dt.myDateTime());

    res.end();
  }).listen(3000);



 