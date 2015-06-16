game.addAsset('particle.png');

game.createScene('Main', {	
    init: function() {
    	this.emitter = new game.Emitter();
    	this.emitter.textures.push('particle.png');
    	this.emitter.angleVar = Math.PI / 4;
    	this.emitter.startPos.set(game.width / 2, game.height / 2);
    	this.emitter.rate = 20;
    	this.emitter.count = 10;
    	this.emitter.duration = 500;
    	this.emitter.endAlpha = 0;
    	this.emitter.speedVar = 50;
    	this.emitter.addTo(this.stage);

    	this.addEmitter(this.emitter);
    },

    mousedown: function() {
    	this.emitter.reset();
    }
});
