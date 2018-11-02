exports.player1 = {
	name: "",
	deck: [],
	hand: {},
	board: {}
};

exports.player2 = {
	name: "",
	deck: [],
	hand: {},
	board: {}
};

exports.create = function(playerName) {
	console.log("Create call: " + playerName);
	//this.player1 = require('./Player');
	//this.player1.setName(playerName);
	this.player1.name = playerName;
	this.setDeck('player1');
	console.log(this.player1.deck[0].name);
}

exports.join = function(playerName) {
	console.log("Join call: " + playerName);
	//this.player2 = require('./Player');
	//this.player2.setName(playerName);
	this.player2.name = playerName;

	this.setDeck('player2');
}

exports.drawCard = function(playerName) {

}

exports.setDeck = function(thePlayer) {
	var fs = require('fs');
	var deck = require('./Deck');
	var playerDeck = deck.getDeck('deck1');

	for (var i = 0; i < playerDeck.deckList.length; i++) {

		var tempCardString = './cards/' + playerDeck.deckList[i] + '.json';
		var tempCardRaw = fs.readFileSync(tempCardString);
		var tempCard = JSON.parse(tempCardRaw);

		if (thePlayer == 'player1') {
			this.player1.deck.push(tempCard);
		} else if (thePlayer == 'player2') {
			this.player2.deck.push(tempCard);
		}
	}
}


