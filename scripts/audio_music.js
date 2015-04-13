game.addAudio('music.m4a', 'music');

game.createScene('Main', {
	init: function() {
		game.audio.playMusic('music');
	},

	mousedown: function() {
		game.audio.pauseMusic();
	},

	mouseup: function() {
		game.audio.resumeMusic();
	}
});
