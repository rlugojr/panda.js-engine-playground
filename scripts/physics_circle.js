game.addAsset('panda.png');

game.createClass('Panda', {
	init: function(x, y) {
		this.body = new game.Body();
		this.body.setCollisionGroup(1);
		this.body.setCollideAgainst(0);
		this.body.velocity.x = Math.random(150, 300);
		this.body.velocity.y = Math.random(0, -300);
		this.body.damping = 0.3;
		this.body.position.set(x, y);
		this.body.collide = this.collide.bind(this);

		this.sprite = new game.Sprite('panda.png');
		this.sprite.anchorCenter();
		this.sprite.addTo(game.scene.stage);

		var shape = new game.Circle(this.sprite.width / 2);
		this.body.addShape(shape);
		this.body.addTo(game.scene.world);
	},

	collide: function(body) {
		this.body.position.y = body.position.y - body.shape.height / 2 - this.body.shape.radius;
		this.body.velocity.y *= -0.5;
		return true;
	},

	remove: function() {
		this.body.remove();
		this.sprite.remove();
		game.scene.removeObject(this);
	},

	update: function() {
		this.sprite.rotation += (this.body.velocity.x / 20) * game.delta;
		if (this.body.velocity.x < 5) this.remove();
		this.sprite.position.copy(this.body.position);
	}
});

game.createScene('Main', {
    init: function() {
    	this.world = new game.World();

    	var floor = new game.Body();
    	floor.position.set(game.width / 2, game.height + 50);
    	floor.mass = 0;
    	floor.addShape(new game.Rectangle(game.width + 100, 100));
    	floor.addTo(this.world);

    	this.addTimer(100, this.addPanda.bind(this), true);
    },

    mousedown: function() {
    	game.Debug.showBodies = !game.Debug.showBodies;
    },

    addPanda: function() {
    	var panda = new game.Panda(-50, game.height / 2 + Math.random(-100, 100));
    }
});
