game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);

		this.addTween(sprite.position, {
			x: 100,
			y: 100
		}, 2000, {
			easing: 'Quadratic.InOut',
			repeat: Infinity,
			yoyo: true
		}).start();
	}
});
