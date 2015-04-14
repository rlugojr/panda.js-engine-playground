game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);

		var tween = new game.Tween(sprite.position);
		tween.to({ x: 500, y: 500 }, 5000);
		tween.start();
	}
});
