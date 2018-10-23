// Load the express module to create a server
var express = require('express');
var app = express(); 
app.set('view engine', 'ejs');  
var path = require('path');
var games = [];

//-----List all the implementing api methods------

//API for starting the front page. Should also asign player id.
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/Frontpage.html'));
});


app.get('/joinGame/:gameId/:playerId', function(request, response) {

});

app.get('/createGame/:gameId/:playerId', function(request, response) {
  var game = require('./modelClasses/Game');
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.set("Content-Type", "text/json"); 

  games.push(game);
  
  console.log(games.length);
  //response.sendFile(path.join(__dirname+'/views/Gamepage.html'));

  location.assign(__dirname+'/view/Gamepage.ejs');

  response.render('Gamepage', {
    playerId: '223'
  });
});


//API for drawing a card based on the game and the player (GameId has not yet been implemented)
app.get('/drawCard/:gameId/:playerId', function(request, response) {
  var deck =  require('./modelClasses/Deck');
  var theCard = deck.drawCard(request.params.playerId);

  response.setHeader("Access-Control-Allow-Origin", "*"); //How much access should be given?
  response.set("Content-Type", "text/json"); 
  response.end(JSON.stringify(theCard));

  console.log(theCard.name + " has been drawn");
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("CardStone server listening at http://%s:%s", host, port);
});
