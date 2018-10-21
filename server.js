// Load the express module to create a server
var express = require('express');
var app = express(); 


//-----List all the implementing api methods------

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