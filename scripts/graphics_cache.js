game.createScene('Main', {
    init: function() {
    	var grap = new game.Graphics();
        grap.fillColor = '#ff0000';
        grap.drawCircle(100, 100, 100);

        grap.fillColor = '#00ff00';
        grap.lineColor = '#0000ff';

        grap.lineWidth = 2;
        grap.drawCircle(100, 100, 50);
        
        grap.lineWidth = 4;
        grap.drawRect(100, 100, 50);
        
        grap.addTo(this.stage);

        grap.cacheAsBitmap = true;
    }
});
