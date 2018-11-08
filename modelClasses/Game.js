exports.player1 = {
	name: "",
	deck: [],
	hand: [],
	board: []
};

exports.player2 = {
	name: "",
	deck: [],
	hand: [],
	board: []
};

exports.currentPlayer = 'p1';

exports.endTurn = function() {
	if (this.currentPlayer == 'p1') {
		this.currentPlayer = 'p2';
	} else {
		this.currentPlayer = 'p1'; 
	}
};


exports.create = function(playerName) {
	console.log("Create call: " + playerName);
	//this.player1 = require('./Player');
	//this.player1.setName(playerName);
	this.player1.name = playerName;
	this.setDeck('player1');
};

exports.join = function(playerName) {
	console.log("Join call: " + playerName);
	//this.player2 = require('./Player');
	//this.player2.setName(playerName);
	this.player2.name = playerName;
	this.setDeck('player2');
};

exports.attack = function(attacker, defender, attIndex, defIndex) {
	var attHealth = attacker.health - defender.attack;
	var defHealth = defender.health - attacker.attack;

	if (this.currentPlayer == 'p1') {
		if (attHealth < 1) {
			this.player1.board.splice(Number(attIndex), 1); //Remove if dead
		} else {
			this.player1.board[Number(attIndex)].health = attHealth;
		}

		if (defHealth < 1) {
			this.player2.board.splice(Number(defIndex), 1);
		} else {
			this.player2.board[Number(defIndex)].health = defHealth;
		}
	}

	if (this.currentPlayer == 'p2') {
		if (attHealth < 1) {
			this.player2.board.splice(Number(attIndex), 1); //Remove if dead
		} else {
			this.player2.board[Number(attIndex)].health = attHealth;
		}
		
		if (defHealth < 1) {
			this.player1.board.splice(Number(defIndex), 1);
		} else {
			this.player1.board[Number(defIndex)].health = defHealth;
		}
	}
};

exports.playCard = function(playerName, cardToPlay, placeOnBoard) {
	if (playerName == this.player1.name) {
		for (var card in this.player1.hand) {
			if (card.id == cardToPlay.id) {
				var cardPlayed = player1.hand.pop();
				player1.board.splice(Number(placeOnBoard), 0, cardPlayed);
				return this.player1;
			}
		}

	} else if (playerName == this.player2.name) {
		for (var card in this.player2.hand) {
			if (card.id == cardToPlay.id) {
				var cardPlayed = player2.hand.pop();
				player2.board.splice(Number(placeOnBoard), 0, cardPlayed);
				return this.player2;
			}
		}
	}
};

exports.drawCard = function(playerName) {
	var cardDrawn;

	if (playerName == this.player1.name) {
		cardDrawn = this.player1.deck.pop();
		this.player1.hand.push(cardDrawn);

	} else if (playerName == this.player2.name) {
		cardDrawn = this.player2.deck.pop();
		this.player2.hand.push(cardDrawn);
	}

	return cardDrawn;
};

exports.setDeck = function(thePlayer) {
	var fs = require('fs');
	var deck = require('./Deck');
	var playerDeck = deck.getDeck('deck1');

	for (var i = 0; i < playerDeck.deckList.length; i++) {

		var tempCardString = './cards/' + playerDeck.deckList[i] + '.json'; //filePath
		var tempCardRaw = fs.readFileSync(tempCardString); //some raw data 
		var tempCard = JSON.parse(tempCardRaw); //card as json
		tempCard.id = String(i);

		if (thePlayer == 'player1') {
			this.player1.deck.push(tempCard);
		} else if (thePlayer == 'player2') {
			this.player2.deck.push(tempCard);
		}
	}
};


