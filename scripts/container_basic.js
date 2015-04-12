game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		var container = new game.Container();
		container.addTo(this.stage);

		var sprite = new game.Sprite('panda.png');
		sprite.addTo(container);
	}
});
