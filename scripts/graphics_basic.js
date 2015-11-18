game.createScene('Main', {
	init: function() {
		var grap = new game.Graphics();
		grap.fillColor = '#00ff00';
		grap.drawRect(0, 0, 100, 100);
		grap.addTo(this.stage);
	}
});
