// Create web server

var express = require('express');
var app = express();

var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submitComment', function(req, res) {
  var comment = req.body.comment;
  console.log('Comment: ' + comment);
  fs.appendFile('comments.txt', comment + '\n', function(err) {
    if (err) {
      console.log('Error: ' + err);
    }
  });
  res.redirect('/');
});

app.get('/getComments', function(req, res) {
  fs.readFile('comments.txt', 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
    }
    res.send(data);
  });
});

app.listen(3000, function() {
  console.log('Server running on port 3000');
});