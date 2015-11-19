game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.anchor.set(0.5);
		sprite.scale.set(0);
		sprite.center(this.stage);
		sprite.addTo(this.stage);

		this.addTween(sprite.scale, {
			x: 2,
			y: 2
		}, 1000, {
			easing: 'Quadratic.InOut',
			repeat: Infinity,
			yoyo: true
		}).start();
	}
});
