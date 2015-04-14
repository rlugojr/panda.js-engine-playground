game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);

		var tween1 = new game.Tween(sprite.position);
		tween1.to({ x: 100, y: 100 }, 1000);
		tween1.easing('Quadratic.InOut');
		
		var tween2 = new game.Tween(sprite.position);
		tween2.to({ y: 0 }, 1000);
		tween2.easing('Quadratic.InOut');

		var tween3 = new game.Tween(sprite.position);
		tween3.to({ x: 0 }, 1000);
		tween3.easing('Quadratic.InOut');

		tween1.chain(tween2);
		tween2.chain(tween3);
		tween3.chain(tween1);
		tween1.start();
	}
});
