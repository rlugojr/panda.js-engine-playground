game.addAsset('font.fnt');

game.createClass('MyText', 'Text', {
	text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nSed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien.\n\nMauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.',
	font: 'Fjalla',
	wrap: 400,
	align: 'center',

	init: function() {
		this.position.x = game.width / 2;
		this.position.y = game.height;
		this.anchor.x = 0.5;
		this.cacheAsBitmap = true;
		this.addTo(game.scene.stage);
	},

	update: function() {
		this.position.y -= 20 * game.delta;
	}
});

game.createScene('Main', {
	init: function() {
		var text = new game.MyText();
	}
});
