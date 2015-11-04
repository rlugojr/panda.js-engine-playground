game.addAsset('panda.png');

game.createScene('Main', {
	sprites: [],

	mousedown: function(x, y, id) {
		var sprite = new game.Sprite('panda.png');
		sprite.position.set(x, y);
		sprite.addTo(this.stage);
		this.sprites[id] = sprite;
	},

	mousemove: function(x, y, id) {
		if (!this.sprites[id]) return;
		this.sprites[id].position.set(x, y);
	},

	mouseup: function(x, y, id) {
		if (!this.sprites[id]) return;
		this.sprites[id].remove();
		this.sprites[id] = null;
	}
});
