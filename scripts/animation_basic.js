game.addAsset('panda.png');
game.addAsset('panda2.png');
game.addAsset('panda3.png');

game.createScene('Main', {
	init: function() {
		var anim = new game.Animation([
		    'panda.png',
		    'panda2.png',
		    'panda3.png',
		    'panda2.png'
		]);
		anim.play();
		anim.addTo(this.stage);
	}
});
