game.addAudio('sound.m4a', 'sound');

game.createScene('Main', {
	mousedown: function() {
		game.audio.playSound('sound');
	}
});
