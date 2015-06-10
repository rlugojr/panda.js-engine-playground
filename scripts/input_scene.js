game.addAsset('panda.png');

game.createScene('Main', {
	init: function() {
		this.sprite = new game.Sprite('panda.png');
		this.sprite.addTo(this.stage);
	},

	mousedown: function(x, y) {
		var sprite = new game.Sprite('panda.png');
		sprite.position.set(x, y);
		sprite.addTo(this.stage);
	},

	mousemove: function(x, y) {
		this.sprite.position.set(x, y);
	}
});
