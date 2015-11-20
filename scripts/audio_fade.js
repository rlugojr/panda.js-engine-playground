game.addAudio('music.m4a');

game.createScene('Main', {
	init: function() {
		var music = new game.Music('music.m4a');
		music.play();
		music.fadeIn(1);

		this.addTimer(6000, function() {
			music.fadeOut(2);
		});
	}
});
