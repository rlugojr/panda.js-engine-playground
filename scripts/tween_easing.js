game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);

		var tween = new game.Tween(sprite.position);
		tween.to({ x: 100, y: 100 }, 2000);
		tween.easing('Quadratic.InOut');
		tween.start();
	}
});
