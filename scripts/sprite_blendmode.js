game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		for (var i = 0; i < 5; i++) {
			var sprite = new game.Sprite('panda.png');
			sprite.position.x = i * 20;
			sprite.position.y = game.height / 2;
			sprite.blendMode = 8;
			sprite.addTo(this.stage);
		}
	}
});
