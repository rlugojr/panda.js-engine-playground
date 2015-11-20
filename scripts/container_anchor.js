game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var container = new game.Container();
		container.anchor.set(75);
		container.position.set(game.width / 2, game.height / 2);
		container.addTo(this.stage);

		var sprite = new game.Sprite('panda.png');
		sprite.addTo(container);

		var sprite = new game.Sprite('panda.png');
		sprite.position.set(50);
		sprite.addTo(container);

		var sprite = new game.Sprite('panda.png');
		sprite.position.set(100);
		sprite.addTo(container);
	}
});
