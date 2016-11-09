// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var songDuplicateCheck = require('../modules/songCheck');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);


var currentDate = new Date;
// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",
    dateAdded: currentDate.toLocaleString()
  }
];

var duplicateCounter = 0;
// Routes
app.post('/songs', function(req, res) {
  console.log(songs);
  // songCheck();
  // req.body is supplied by bodyParser above
  duplicateCounter = 0;
  var newSong = req.body;

  if (newSong.title === "" || newSong.artist === "") {
    res.sendStatus(400);
  }

  if (!songDuplicateCheck(newSong, songs)) {
    var currentDate = new Date;
    newSong.dateAdded = currentDate.toLocaleString();
    songs.push(newSong);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }

  return songs;
});

app.get('/songs', function(req, res) {
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
