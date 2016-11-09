// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
// var songCheck = require('../modules/songCheck');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A."
  }
];

var duplicateCounter = 0;
// Routes
app.post('/songs', function(req, res) {
  // songCheck();
  // req.body is supplied by bodyParser above
  duplicateCounter = 0;
  var newSong = req.body;

  if (newSong.title === "" || newSong.artist === "") {
    console.log("landed here");
    res.sendStatus(400);
  }

  for (var i = 0; i < songs.length; i++) {
    if(newSong.title === songs[i].title) {
      console.log(newSong.title + " " + songs[i].title);
      console.log("duplicate");
      duplicateCounter++;
    }
  }
  if (duplicateCounter === 0) {
    songs.push(newSong);
    res.sendStatus(201);
  } else {
    console.log(duplicateCounter);
    console.log("That song has already been entered");
    res.sendStatus(400);
  }
});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
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
