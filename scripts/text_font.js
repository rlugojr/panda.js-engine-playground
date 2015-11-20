game.addAsset('font.fnt');
game.addAsset('font2.fnt');

game.createScene('Main', {
	init: function() {
		var text = new game.Text('Hello Panda!', {
			font: 'Fjalla'
		});
		text.addTo(this.stage);

		var text = new game.Text('Hello Panda!', {
			font: 'Arial'
		});
		text.position.y = 100;
		text.addTo(this.stage);
	}
});
