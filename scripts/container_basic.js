game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var container = new game.Container();
		container.position.set(100, 100);
		container.addTo(this.stage);

		var sprite = new game.Sprite('panda.png');
		sprite.position.set(50, 50);
		sprite.addTo(container);
	}
});
