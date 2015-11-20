game.addAsset('font.fnt');

game.createScene('Main', {
	init: function() {
		var text = new game.Text('Hello Panda!');
		text.addTo(this.stage);
	}
});
