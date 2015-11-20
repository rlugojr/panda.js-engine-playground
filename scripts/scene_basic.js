game.createScene('Main', {
	backgroundColor: '#ff0000',

	mousedown: function() {
		game.system.setScene('Main2');
	}
});

game.createScene('Main2', {
	backgroundColor: '#00ff00',

	mousedown: function() {
		game.system.setScene('Main');
	}
});
