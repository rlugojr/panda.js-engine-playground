game.addAsset('font.fnt');

game.createScene('Main', {
	init: function() {
		var text = new game.Text('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.', {
			wrap: 300,
			align: 'center'
		});
		text.addTo(this.stage);
	}
});
