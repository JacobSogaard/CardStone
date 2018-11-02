exports.player1 = {
	name: "",
	deck: {},
	hand: {},
	board: {}
};

exports.player2 = {
	name: "",
	deck: {},
	hand: {},
	board: {}
};

exports.create = function(playerName) {
	console.log("Create call: " + playerName);
	//this.player1 = require('./Player');
	//this.player1.setName(playerName);
	this.player1.name = playerName;
}

exports.join = function(playerName) {
	console.log("Join call: " + playerName);
	//this.player2 = require('./Player');
	//this.player2.setName(playerName);
	this.player2.name = playerName;

	setDecks();
}

function setDecks() {
	
}



