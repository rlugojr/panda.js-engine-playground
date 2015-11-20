game.addAsset('panda.png');

game.createClass('Panda', 'Sprite', {
	texture: 'panda.png',

	init: function(x, y, anchor) {
		this.anchor.set(anchor);
		this.position.set(x, y);
		this.addTo(game.scene.stage);
	},

	update: function() {
		this.rotation += 1 * game.delta;
	}
});

game.createScene('Main', {
	init: function() {
		var sprite = new game.Panda(100, 100, 0);
		var sprite = new game.Panda(300, 300, 25);
		var sprite = new game.Panda(500, 500, 50);
	}
});
