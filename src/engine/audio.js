/**
    @module audio
**/
game.module(
    'engine.audio'
)
.body(function() {
'use strict';

/**
    Audio manager.
    @class Audio
**/
game.createClass('Audio', {
    /**
        List of supported audio formats.
        @property {Array} formats
    **/
    formats: [],
    /**
        List of playing sounds.
        @property {Array} playingSounds
    **/
    playingSounds: [],
    /**
        List of paused sounds.
        @property {Array} pausedSounds
    **/
    pausedSounds: [],
    /**
        Current music id.
        @property {Number} currentMusic
    **/
    currentMusic: null,
    /**
        Name of current music.
        @property {String} currentMusicName
    **/
    currentMusicName: null,
    /**
        Is music muted.
        @property {Boolean} musicMuted
        @default false
    **/
    musicMuted: false,
    /**
        Is sounds muted.
        @property {Boolean} soundMuted
        @default false
    **/
    soundMuted: false,
    /**
        @property {Number} _audioId
        @private
    **/
    _audioId: 1,
    /**
        @property {Object} _audioObjects
        @private
    **/
    _audioObjects: {},
    /**
        @property {Array} _systemPaused
        @private
    **/
    _systemPaused: [],
    /**
        @property {Object} _sources
        @private
    **/
    _sources: {},

    init: function() {
        game._normalizeVendorAttribute(window, 'AudioContext');

        // Disable audio on iOS 5
        if (game.device.iOS5) game.Audio.enabled = false;

        // Disable audio on Windows Phone 7
        if (game.device.wp7) game.Audio.enabled = false;

        // Disable audio on Android 2
        if (game.device.android2) game.Audio.enabled = false;

        // Disable Web Audio if audio disabled
        if (!game.Audio.enabled) game.Audio.webAudio = false;

        // Disable Web Audio if not supported
        if (game.Audio.webAudio && !window.AudioContext) game.Audio.webAudio = false;

        // Get supported audio formats
        if (game.Audio.enabled) {
            var audio = new Audio();
            for (var i = 0; i < game.Audio.formats.length; i++) {
                if (audio.canPlayType(game.Audio.formats[i].type)) {
                    this.formats.push(game.Audio.formats[i].ext);
                }
            }
        }

        // Remove m4a format on Opera, when using Web Audio (decode fails)
        if (game.device.opera && game.Audio.webAudio) this.formats.erase('m4a');

        // Disable audio if no compatible format found
        if (this.formats.length === 0) game.Audio.enabled = false;

        // Init Web Audio
        if (game.Audio.enabled && game.Audio.webAudio) {
            this.context = new AudioContext();
            this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
            this.gainNode.connect(this.context.destination);
        }

        this.musicVolume = game.Audio.musicVolume;
        this.soundVolume = game.Audio.soundVolume;
    },

    /**
        Play sound.
        @method playSound
        @param {String} name Name of sound
        @param {Boolean} [loop] Sound looping
        @param {Function} [callback] Callback when sound is finished
        @param {Number} [rate] Playback rate (Web Audio)
        @return {Number} id
    **/
    playSound: function(name, loop, callback, rate) {
        var volume = this.soundMuted ? 0 : this.soundVolume;
        var id = this._play(name, loop, volume, callback, rate);
        if (id) this.playingSounds.push(id);
        return id;
    },

    /**
        Stop specific or all sounds.
        @method stopSound
        @param {Number} [id] Id of sound
        @param {Boolean} [skipCallback] Skip callback function
        @return {Boolean}
    **/
    stopSound: function(id, skipCallback) {
        if (id) {
            return this._stop(id, !!skipCallback);
        }
        else {
            for (var i = this.playingSounds.length - 1; i >= 0; i--) {
                this._stop(this.playingSounds[i], !!skipCallback);
            }
            return true;
        }
    },

    /**
        Pause specific or all sounds.
        @method pauseSound
        @param {Number} [id] Id of sound
        @return {Boolean} Return false, if sound is not playing
    **/
    pauseSound: function(id) {
        if (id) {
            var index = this.playingSounds.indexOf(id);
            if (index === -1) return false;

            this._pause(id);
            this.playingSounds.splice(index, 1);
            this.pausedSounds.push(id);
        }
        else {
            for (var i = this.playingSounds.length - 1; i >= 0; i--) {
                this._pause(this.playingSounds[i]);
                this.pausedSounds.push(this.playingSounds[i]);
            }
            this.playingSounds.length = 0;
        }
        return true;
    },

    /**
        Resume sound.
        @method resumeSound
        @param {Number} id Id of sound
        @return {Boolean} Return false, if sound is not paused
    **/
    resumeSound: function(id) {
        var index = this.pausedSounds.indexOf(id);
        if (index === -1) return false;

        this._resume(id);
        this.playingSounds.push(id);
        this.pausedSounds.splice(index, 1);
        
        return true;
    },

    /**
        Mute specific sound or all sounds.
        @method muteSound
        @param {Number} [id] Id of sound
        @return {Boolean}
    **/
    muteSound: function(id) {
        if (id) {
            return this._mute(id);
        }
        else {
            this.soundMuted = true;
            var i;
            for (i = this.playingSounds.length - 1; i >= 0; i--) {
                this._mute(this.playingSounds[i]);
            }
            for (i = this.pausedSounds.length - 1; i >= 0; i--) {
                this._mute(this.pausedSounds[i]);
            }
            return true;
        }
    },

    /**
        Unmute specific sound or all sounds.
        @method unmuteSound
        @param {Number} [id] Id of sound
        @return {Boolean}
    **/
    unmuteSound: function(id) {
        if (id) {
            return this._unmute(id, this.soundVolume);
        }
        else {
            this.soundMuted = false;
            var i;
            for (i = this.playingSounds.length - 1; i >= 0; i--) {
                this._unmute(this.playingSounds[i], this.soundVolume);
            }
            for (i = this.pausedSounds.length - 1; i >= 0; i--) {
                this._unmute(this.pausedSounds[i], this.soundVolume);
            }
            return true;
        }
    },

    /**
        Play music.
        @method playMusic
        @param {Number} name Name of music
        @param {Boolean} [loop] Music looping
        @return {Boolean}
    **/
    playMusic: function(name, loop) {
        var volume = this.musicMuted ? 0 : this.musicVolume;
        
        if (typeof loop === 'undefined') loop = true;

        if (this.currentMusic) this._stop(this.currentMusic);
        
        this.currentMusic = this._play(name, !!loop, volume);
        this.currentMusicName = name;
        
        return !!this.currentMusic;
    },

    /**
        Stop current music.
        @method stopMusic
        @return {Boolean}
    **/
    stopMusic: function() {
        if (this.currentMusic) {
            var stop = this._stop(this.currentMusic);
            this.currentMusic = null;
            this.currentMusicName = null;
            return !!stop;
        }

        return false;
    },

    /**
        Pause current music.
        @method pauseMusic
        @return {Boolean}
    **/
    pauseMusic: function() {
        if (this.currentMusic) return this._pause(this.currentMusic);
        return false;
    },

    /**
        Resume current music.
        @method resumeMusic
        @return {Boolean}
    **/
    resumeMusic: function() {
        return this._resume(this.currentMusic);
    },

    /**
        Mute current music.
        @method muteMusic
    **/
    muteMusic: function() {
        this.musicMuted = true;
        if (this.currentMusic) this._mute(this.currentMusic);
    },

    /**
        Unmute current music.
        @method unmuteMusic
    **/
    unmuteMusic: function() {
        this.musicMuted = false;
        if (this.currentMusic) this._unmute(this.currentMusic, this.musicVolume);
    },

    /**
        Set volume for specific audio.
        @method setVolume
        @param {Number} id
        @param {Number} value
    **/
    setVolume: function(id, value) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        // Web Audio
        if (this.context) audio.gainNode.gain.value = value;
        // HTML5 Audio
        else audio.volume = value;
    },

    /**
        Change main sound volume.
        @method setSoundVolume
        @param {Number} value
    **/
    setSoundVolume: function(value) {
        this.soundVolume = value;

        var i;
        for (i = this.playingSounds.length - 1; i >= 0; i--) {
            if (this.context) {
                this._audioObjects[this.playingSounds[i]].gainNode.gain.value = this.soundVolume;
            }
            else {
                this.playingSounds[i].volume = this.soundVolume;
            }
        }

        for (i = this.pausedSounds.length - 1; i >= 0; i--) {
            if (this.context) {
                this._audioObjects[this.pausedSounds[i]].gainNode.gain.value = this.soundVolume;
            }
            else {
                this.pausedSounds[i].volume = this.soundVolume;
            }
        }
    },

    /**
        Change main music volume.
        @method setMusicVolume
        @param {Number} value
    **/
    setMusicVolume: function(value) {
        this.musicVolume = value;

        if (!this.currentMusic) return;

        if (this.context) {
            this._audioObjects[this.currentMusic].gainNode.gain.value = this.musicVolume;
        }
        else {
            this.currentMusic.volume = this.musicVolume;
        }
    },

    /**
        Change audio playback rate (Web Audio).
        @method setPlaybackRate
        @param {Number} id
        @param {Number} rate
    **/
    setPlaybackRate: function(id, rate) {
        if (this.context) {
            var audio = this._audioObjects[id];
            if (audio) audio.playbackRate.value = rate || 1;
        }
    },

    /**
        Check if sound is playing.
        @method isSoundPlaying
        @param {Number} id
        @return {Boolean}
    **/
    isSoundPlaying: function(id) {
        return this.playingSounds.indexOf(id) !== -1 ? true : false;
    },

    /**
        Check if music is playing.
        @method isMusicPlaying
        @return {Boolean}
    **/
    isMusicPlaying: function() {
        return !!this.currentMusic;
    },

    /**
        Toggle sounds on/off.
        @method toggleSound
        @return {Boolean}
    **/
    toggleSound: function() {
        this.soundMuted = !this.soundMuted;
        if (this.soundMuted) this.muteSound();
        else this.unmuteSound();

        return this.soundMuted;
    },

    /**
        Toggle music on/off.
        @method toggleMusic
        @return {Boolean}
    **/
    toggleMusic: function() {
        this.musicMuted = !this.musicMuted;
        if (this.musicMuted) this.muteMusic();
        else this.unmuteMusic();

        return this.musicMuted;
    },

    /**
        @method _decode
        @private
    **/
    _decode: function(request, path, callback) {
        this.context.decodeAudioData(
            request.response,
            this._loaded.bind(this, path, callback),
            this._error.bind(this, path)
        );
    },
    
    /**
        @method _load
        @param {String} path
        @param {Function} callback
        @private
    **/
    _load: function(path, callback) {
        var ext = path.split('.').pop();
        if (this.formats.indexOf(ext) === -1) ext = this.formats[0];
        
        var realPath = path.replace(/[^\.]+$/, ext + game._nocache);

        // Web Audio
        if (this.context) {
            var request = new XMLHttpRequest();
            request.open('GET', realPath, true);
            request.responseType = 'arraybuffer';
            request.onload = this._decode.bind(this, request, path, callback);
            request.send();
        }
        // HTML5 Audio
        else {
            var audio = new Audio(realPath);
            if (game.device.ie) {
                // Sometimes IE fails to trigger events, when loading audio
                this._loaded(path, callback, audio);
            }
            else {
                audio.loadCallback = this._loaded.bind(this, path, callback, audio);
                audio.addEventListener('canplaythrough', audio.loadCallback);
                audio.addEventListener('error', this._error.bind(this, path));
            }
            audio.preload = 'auto';
            audio.load();
        }
    },

    /**
        @method _error
        @param {String} path
        @private
    **/
    _error: function(path) {
        throw 'Error loading audio ' + path;
    },

    /**
        @method _loaded
        @param {String} path
        @param {Function} callback
        @param {Audio} audio
        @private
    **/
    _loaded: function(path, callback, audio) {
        for (var name in game.paths) {
            if (game.paths[name] === path) {
                var id = name;
                break;
            }
        }

        this._sources[id] = {
            audio: audio,
            path: path
        };

        if (!this.context) {
            audio.removeEventListener('canplaythrough', audio.loadCallback);
            audio.addEventListener('ended', function() {
                this.playing = false;
            });
        }

        if (typeof callback === 'function') callback(path);
    },

    /**
        @method _onended
        @param {Number} id
        @private
    **/
    _onended: function(id) {
        var index = this.playingSounds.indexOf(id);
        if (index !== -1) this.playingSounds.splice(index, 1);

        if (id === this.currentMusic) {
            this.currentMusic = null;
            this.currentMusicName = null;
        }

        var audio = this._audioObjects[id];
        if (!audio) return false;

        if (typeof audio.callback === 'function') audio.callback();

        delete this._audioObjects[id];
    },

    /**
        @method _play
        @param {String} name
        @param {Boolean} loop
        @param {Number} volume
        @param {Function} callback
        @param {Number} rate
        @param {Number} time
        @param {Number} audioId
        @private
    **/
    _play: function(name, loop, volume, callback, rate, time, audioId) {
        if (!game.Audio.enabled) return false;
        if (typeof audioId !== 'number') audioId = this._audioId++;

        // Web Audio
        if (this.context) {
            var audio = this.context.createBufferSource();
            audio.buffer = this._sources[name].audio;
            audio.loop = !!loop;
            audio.playbackRate.value = rate || 1;
            audio.callback = callback;
            audio.onended = this._onended.bind(this, audioId);

            var gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
            gainNode.gain.value = typeof volume === 'number' ? volume : 1;
            gainNode.connect(this.gainNode);
            audio.connect(gainNode);
            audio.gainNode = gainNode;

            var startTime = time || 0;
            if (audio.start) audio.start(0, startTime);
            else audio.noteOn(0, startTime);
            audio.startTime = this.context.currentTime - startTime;
        }
        // HTML5 Audio
        else {
            if (this._sources[name].audio.playing) return false;
            this._sources[name].audio.volume = typeof volume === 'number' ? volume : 1;
            this._sources[name].audio.loop = loop;
            this._sources[name].audio.playing = true;
            this._sources[name].audio.callback = callback;
            this._sources[name].audio.onended = this._onended.bind(this, audioId);
            if (!game.device.ie) this._sources[name].audio.currentTime = 0;
            this._sources[name].audio.play();
            var audio = this._sources[name].audio;
        }

        this._audioObjects[audioId] = audio;
        return audioId;
    },

    /**
        @method _stop
        @param {Number} id
        @param {Boolean} skipCallback
        @private
    **/
    _stop: function(id, skipCallback) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        if (skipCallback) audio.callback = null;

        // Web Audio
        if (this.context) {
            if (audio.pauseTime >= 0) return false;
            if (typeof audio.stop === 'function') audio.stop(0);
            else audio.noteOff(0);
        }
        // HTML5 Audio
        else {
            audio.pause();
            audio.playing = false;
        }

        return true;
    },

    /**
        @method _pause
        @param {Number} id
        @private
    **/
    _pause: function(id) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        // Web Audio
        if (this.context) {
            audio.onended = null;
            if (typeof audio.stop === 'function') audio.stop(0);
            else audio.noteOff(0);
            audio.pauseTime = (this.context.currentTime - audio.startTime) % audio.buffer.duration;
        }
        // HTML5 Audio
        else {
            if (audio.currentTime > 0 && audio.currentTime < audio.duration || audio.loop) {
                audio.pause();
            }
        }

        return true;
    },

    /**
        @method _resume
        @param {Number} id
        @private
    **/
    _resume: function(id) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        // Web Audio
        if (this.context) {
            if (audio.pauseTime >= 0) {
                var audioName = this._getNameForAudio(audio);
                this._play(audioName, audio.loop, audio.gainNode.gain.value, audio.callback, audio.playbackRate, audio.pauseTime, id);
            }
            else return false;
        }
        // HTML5 Audio
        else {
            if (audio.playing) audio.play();
            else return false;
        }

        return true;
    },

    /**
        @method _mute
        @param {Number} id
        @private
    **/
    _mute: function(id) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        // Web Audio
        if (this.context) {
            audio.gainNode.gain.value = 0;
        }
        // HTML5 Audio
        else {
            audio.volume = 0;
        }

        return true;
    },

    /**
        @method _unmute
        @param {Number} id
        @param {Number} volume
        @private
    **/
    _unmute: function(id, volume) {
        var audio = this._audioObjects[id];
        if (!audio) return false;

        // Web Audio
        if (this.context) {
            audio.gainNode.gain.value = volume || 1;
        }
        // HTML5 Audio
        else {
            audio.volume = volume || 1;
        }

        return true;
    },

    /**
        @method _getNameForAudio
        @param {Audio} audio
        @private
    **/
    _getNameForAudio: function(audio) {
        // Web Audio
        if (this.context) {
            for (var name in this._sources) {
                if (this._sources[name].audio === audio.buffer) return name;
            }
        }
        // HTML5 Audio
        else {
            for (var name in this._sources) {
                if (this._sources[name].audio === audio) return name;
            }
        }

        return false;
    },

    /**
        @method _systemPause
        @private
    **/
    _systemPause: function() {
        this.pauseMusic();

        for (var i = this.playingSounds.length - 1; i >= 0; i--) {
            this._pause(this.playingSounds[i]);
            this._systemPaused.push(this.playingSounds[i]);
        }
    },

    /**
        @method _systemResume
        @private
    **/
    _systemResume: function() {
        this.resumeMusic();

        for (var i = this._systemPaused.length - 1; i >= 0; i--) {
            this._resume(this._systemPaused[i]);
        }

        this._systemPaused.length = 0;
    }
});

game.addAttributes('Audio', {
    /**
        Enable audio.
        @attribute {Boolean} enabled
        @default true
    **/
    enabled: true,
    /**
        Enable Web Audio.
        @attribute {Boolean} webAudio
        @default true
    **/
    webAudio: true,
    /**
        List of available audio formats.
        @attribute {Array} formats
    **/
    formats: [
        { ext: 'ogg', type: 'audio/ogg; codecs="vorbis"' },
        { ext: 'm4a', type: 'audio/mp4; codecs="mp4a.40.5"' },
        { ext: 'wav', type: 'audio/wav' }
    ],
    /**
        Stop audio, when changing scene.
        @attribute {Boolean} stopOnSceneChange
        @default true
    **/
    stopOnSceneChange: true,
    /**
        Sound volume.
        @attribute {Number} soundVolume
        @default 1
    **/
    soundVolume: 1,
    /**
        Music volume.
        @attribute {Number} musicVolume
        @default 1
    **/
    musicVolume: 1
});

});
