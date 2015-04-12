game.addAsset('panda.png');

game.createClass('Panda', 'Sprite', {
	texture: 'panda.png',

	init: function(x, y) {
		this.position.set(x, y);
		this.addTo(game.scene.stage);
	},

	update: function() {
		this.rotation += 1 * game.system.delta;
	}
});

game.createScene('Main', {
	init: function() {
		var sprite = new game.Panda(100, 100);
		var sprite = new game.Panda(300, 300);
		var sprite = new game.Panda(500, 500);
	}
});
