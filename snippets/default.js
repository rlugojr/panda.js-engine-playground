game.module(
    'game.main'
)
.body(function() {
	
game.createScene('Main', {
    init: function() {
        var sprite = new game.Sprite('panda.png');
        sprite.addTo(this.stage);
    }
});

});
