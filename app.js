const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const http = require('http');
var dt = require('./datetime');

const PORT = 8080;
const html =  "";

rp(url)
.then(function(html){
  //success!
  console.log(html);
})
.catch(function(err){
  //handle error
});

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url+"<p>");
    res.write("The date and time are currently: " + dt.myDateTime());

    res.end();
  }).listen(PORT);



 