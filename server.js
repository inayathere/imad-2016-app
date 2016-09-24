var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/images/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'madi.png'));
});
app.get('/ui/images/inayat.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'inayat.jpg'));
});

app.get('/ui/a.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'a.png'));
});
app.get('/article1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article2', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article3', function (req, res) {
  res.send("Article 3 is responded");
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
