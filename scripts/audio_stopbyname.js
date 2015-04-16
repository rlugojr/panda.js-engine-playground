game.addAudio('music.m4a', 'music');

game.createScene('Main', {
    init: function() {
        game.audio.playSound('music');

        this.addTimer(1000, function() {
            game.audio.playSound('music');
        });
    },

    mousedown: function() {
        game.audio.stopSoundByName('music');
    }
});
