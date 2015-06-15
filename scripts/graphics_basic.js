game.createScene('Main', {
	init: function() {
		var grap = new game.Graphics();
		grap.fillColor = '#ff0000';
		grap.drawRect(0, 0, 100, 100);
		grap.addTo(this.stage);
	}
});
