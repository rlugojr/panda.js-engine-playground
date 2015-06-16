game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
    	var pandas = new game.TilingSprite('panda.png', 300, 200);
    	pandas.addTo(this.stage);
    }
});
