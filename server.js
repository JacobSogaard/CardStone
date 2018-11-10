// Load the express module to create a server
var express = require('express');
var app = express(); 
app.set('view engine', 'ejs');  
var path = require('path');
var games = {};

//-----List all the implementing api methods------

//API for starting the front page. Should also asign player id.
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/Frontpage.html'));
});


app.get('/InProgressGame', function(request, response) {
  response.sendFile(path.join(__dirname+'/InProgressGame.html'));
});

app.get('/joinGame/:gameId/:playerId', function(request, response) {

  var game = games[request.params.gameId];
  game.join(request.params.playerId);
  console.log("This is game after joining: ");
  console.log(game);

  response.sendFile(path.join(__dirname+'/InProgressGame.html'));
});

app.get('/createGame/:gameId/:playerId', function(request, response) {
  console.log("CREATE GAME");
  var game = require('./modelClasses/Game');

  var playerName = request.params.playerId;
  game.create(playerName);

  games[request.params.gameId] = game;

  response.sendFile(path.join(__dirname+'/InProgressGame.html'));

});


//API for drawing a card based on the game and the player (GameId has not yet been implemented)
app.get('/drawCard/:gameId/:playerId', function(request, response) {
  var game = games[request.params.gameId];
  var cardDrawn = game.drawCard(request.params.playerId);

  response.setHeader("Access-Control-Allow-Origin", "*"); //How much access should be given?
  response.set("Content-Type", "text/json"); 
  response.end(JSON.stringify(cardDrawn));

  console.log(cardDrawn.name + " has been drawn");
});

app.get('/playCard/:gameId/:playerId/:cardId/:placeOnBoard', function(request, response) {
  console.log("Playe card gameid: " + request.params.gameId);

  console.log("Player: " + request.params.playerId);
  console.log("Card: " + request.params.cardId);

  var gameUpdate = games[request.params.gameId].playCard(request.params.playerId, 
    request.params.cardId, request.params.placeOnBoard);

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.set("Content-Type", "text/json"); 
  response.end(JSON.stringify(gameUpdate));

  console.log("Updated game after playing a card: " + JSON.stringify(gameUpdate));

});

app.get('/endTurn/:gameId', function(request, response) {
  games[request.params.gameId].endTurn();
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("CardStone server listening at http://%s:%s", host, port);
});
