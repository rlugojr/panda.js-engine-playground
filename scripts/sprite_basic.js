game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);
	}
});
