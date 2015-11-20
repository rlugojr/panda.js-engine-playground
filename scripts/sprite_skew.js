game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.position.set(100, 100);
		sprite.addTo(this.stage);

		var sprite = new game.Sprite('panda.png');
		sprite.position.set(100, 150);
		sprite.skew.x = 0.5;
		sprite.addTo(this.stage);

		var sprite = new game.Sprite('panda.png');
		sprite.position.set(100, 200);
		sprite.skew.set(0.5, 1);
		sprite.addTo(this.stage);
	}
});
