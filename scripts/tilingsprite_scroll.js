game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
    	this.pandas = new game.TilingSprite('panda.png', game.width, game.height);
    	this.pandas.addTo(this.stage);
    },

    update: function() {
    	this.pandas.tilePosition.x -= 300 * game.delta;
    	this.pandas.tilePosition.y -= 100 * game.delta;
    }
});
