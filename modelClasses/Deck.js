//Dummy function for testen drawing different cards based on different criterias
//Real implementation is needed.
exports.drawCard = function(cardToDraw) {
	theCard = require('../cards/card' + cardToDraw + '.json');
	return theCard;
}