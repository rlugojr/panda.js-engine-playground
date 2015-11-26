game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var sprite = new game.Sprite('panda.png');
		sprite.addTo(this.stage);

		var mask = new game.Graphics();
		mask.drawRect(10, 10, 20, 20);

		sprite.mask = mask;
	}
});
