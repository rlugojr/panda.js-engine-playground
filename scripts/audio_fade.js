game.addAudio('music.m4a', 'music');

game.createScene('Main', {
	init: function() {
		var music = game.audio.playSound('music');
		game.audio.fadeIn(music, 1000);

		this.addTimer(6000, function() {
			game.audio.fadeOut(music, 2000);
		});
	}
});
