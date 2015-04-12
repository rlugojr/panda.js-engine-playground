game.addAsset('panda.png');

game.createClass('Panda', 'Sprite', {
	texture: 'panda.png',
	interactive: true,

	init: function(x, y) {
		this.position.set(x, y);
		this.addTo(game.scene.stage);
	},

	mousedown: function() {
		this.remove();
	},

	mousemove: function() {
		this.alpha = 0.5;
	},

	mouseout: function() {
		this.alpha = 1;
	}
});

game.createScene('Main', {
	init: function() {
		var sprite = new game.Panda(100, 100);
	}
});
