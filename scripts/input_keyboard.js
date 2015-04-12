game.addAsset('panda.png');

game.createClass('Player', 'Sprite', {
	texture: 'panda.png',
	speed: 200,

	init: function() {
		this.addTo(game.scene.stage);
	},

	update: function() {
		if (game.keyboard.down('UP')) {
			this.position.y -= this.speed * game.system.delta;
		}
		if (game.keyboard.down('DOWN')) {
			this.position.y += this.speed * game.system.delta;
		}
		if (game.keyboard.down('LEFT')) {
			this.position.x -= this.speed * game.system.delta;
		}
		if (game.keyboard.down('RIGHT')) {
			this.position.x += this.speed * game.system.delta;
		}
	}
});

game.createScene('Main', {
	init: function() {
		this.player = new game.Player();
	},

	keydown: function(key) {
		if (key === 'SPACE') this.player.remove();
	}
});
