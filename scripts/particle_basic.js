game.addAsset('particle.png');

game.createScene('Main', {	
    init: function() {
    	var emitter = new game.Emitter();
    	emitter.textures.push('particle.png');
    	emitter.angleVar = Math.PI;
    	emitter.position.set(game.width / 2, game.height / 2);
    	emitter.addTo(this.stage);
    	this.addEmitter(emitter);
    }
});
