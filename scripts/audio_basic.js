game.addAudio('sound.m4a');

game.createScene('Main', {
	mousedown: function() {
		var sound = new game.Sound('sound.m4a');
		sound.volume = 0.5;
		sound.play();
	}
});
