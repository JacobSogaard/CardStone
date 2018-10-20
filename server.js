// Load the express module to create a server
var express = require('express');
var app = express(); 


//-----List all the implementing api methods------

//API for drawing a card
app.get('/drawCard', function(request, response) {
  var deck =  require('./modelClasses/Deck');
  var theCard = deck.drawCard();

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