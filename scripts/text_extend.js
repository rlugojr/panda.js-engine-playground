game.addAsset('font.fnt');

game.createClass('MyText', 'Text', {
	font: 'Fjalla',

	init: function() {
		this.addTo(game.scene.stage);	
	}
});

game.createScene('Main', {
	init: function() {
		var text = new game.MyText('Hello Panda!');
	}
});
