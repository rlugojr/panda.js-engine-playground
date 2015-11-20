game.addAsset('font.fnt');

game.createClass('MyText', 'Text', {
	init: function() {
		this.anchorCenter();
		this.position.set(game.width / 2, game.height / 2);
		this.addTo(game.scene.stage);
	},

	update: function() {
		this.rotation += 1 * game.delta;
	}
});

game.createScene('Main', {
	init: function() {
		var text = new game.MyText('Hello Panda!');
	}
});
