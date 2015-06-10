game.addAsset('particle.png');

game.createClass('StarEmitter', 'Emitter', {
    textures: ['particle.png'],
    speed: 20,
    speedVar: 10,
    angleVar: Math.PI,
    rate: 10,
    endAlpha: 0,
    // Custom properties
    rotation: 0,
    rotateSpeed: 2,
    distFromCenter: 100,

    init: function() {
        this.addTo(game.scene.stage);
        game.scene.addEmitter(this);
        this.update();
    },

    update: function() {
        // Rotate emitter position around center of canvas
        this.position.x = game.width / 2 + Math.sin(this.rotation) * this.distFromCenter;
        this.position.y = game.height / 2 + Math.cos(this.rotation) * this.distFromCenter;
        this.rotation += this.rotateSpeed * game.delta;
    }
});

game.createScene('Main', {
    init: function() {
        var emitter = new game.StarEmitter();
    }
});
