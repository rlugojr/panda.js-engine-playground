game.addAudio('music.m4a');
game.addAudio('music2.m4a');

game.createScene('Main', {
	init: function() {
		var music = new game.Music('music.m4a');
		music.play();
	},

	mousedown: function() {
		var music = new game.Music('music2.m4a');
		music.play();
	}
});
