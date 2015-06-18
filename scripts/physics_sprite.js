game.addAsset('panda.png');

game.createScene('Main', {
    init: function() {
    	this.world = new game.World();

    	var floor = new game.Body();
    	floor.position.set(game.width / 2, game.height + 50);
    	floor.static = true;
    	floor.collisionGroup = 1;
    	floor.addShape(new game.Rectangle(game.width, 100));
    	floor.addTo(this.world);

    	this.addTimer(500, this.addPanda.bind(this), true);
    },

    addPanda: function() {
    	var panda = new game.PhysicsSprite('panda.png');
    	panda.position.x = game.width.random();
    	panda.body.collideAgainst.push(1);
    	panda.body.collide = function() {
    		this.velocity.y *= -0.5;
    		return true;
    	};
    	panda.addTo(this.stage);

    	this.addTimer(3000, function() {
    		panda.remove();
    	});
    }
});
