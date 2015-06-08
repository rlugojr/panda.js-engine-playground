game.addAsset('panda.png');

game.createClass('Panda', {
	init: function(x, y) {
		this.body = new game.Body();
		this.body.setCollisionGroup(1);
		this.body.setCollideAgainst(0);
		this.body.position.set(x, y);
		this.body.collide = this.collide.bind(this);

		this.sprite = new game.Sprite('panda.png');
		this.sprite.anchorCenter();
		this.sprite.addTo(game.scene.stage);

		var shape = new game.Rectangle(this.sprite.width, this.sprite.height);
		this.body.addShape(shape);
		this.body.addTo(game.scene.world);

		game.scene.addTimer(5000, this.remove.bind(this));
	},

	collide: function() {
		this.body.velocity.y *= -0.5;
		return true;
	},

	remove: function() {
		this.body.remove();
		this.sprite.remove();
	},

	update: function() {
		this.sprite.position.copy(this.body.position);
	}
});

game.createScene('Main', {
	backgroundColor: '#000',
	
    init: function() {
    	this.world = new game.World();

    	var floor = new game.Body();
    	floor.position.set(game.width / 2, game.height + 50);
    	floor.mass = 0;
    	floor.addShape(new game.Rectangle(game.width, 100));
    	floor.addTo(this.world);

    	this.addTimer(500, this.addPanda.bind(this), true);
    },

    addPanda: function() {
    	var panda = new game.Panda(game.width.random(), 0);
    }
});
