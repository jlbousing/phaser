var Class = require('../../utils/Class');
var BaseSound = require('../BaseSound');
var SoundValueEvent = require('../SoundValueEvent');
var HTML5AudioSound = new Class({
    Extends: BaseSound,
    initialize: function HTML5AudioSound(manager, key, config) {
        if (config === void 0) { config = {}; }
        /**
         * An array containing all HTML5 Audio tags that could be used for individual
         * sound's playback. Number of instances depends on the config value passed
         * to the Loader#audio method call, default is 1.
         *
         * @private
         * @property {HTMLAudioElement[]} tags
         */
        this.tags = manager.game.cache.audio.get(key);
        if (!this.tags) {
            console.error('No audio loaded in cache with key: \'' + key + '\'!');
            return;
        }
        /**
         * Reference to an HTML5 Audio tag used for playing sound.
         *
         * @private
         * @property {HTMLAudioElement} audio
         * @default null
         */
        this.audio = null;
        this.duration = this.tags[0].duration;
        this.totalDuration = this.tags[0].duration;
        BaseSound.call(this, manager, key, config);
    },
    play: function (markerName, config) {
        if (!BaseSound.prototype.play.call(this, markerName, config)) {
            return false;
        }
        // TODO implement play method
        this.events.dispatch(new SoundEvent(this, 'SOUND_PLAY'));
        return true;
    },
    pause: function () {
        if (!BaseSound.prototype.pause.call(this)) {
            return false;
        }
        // TODO implement pause method
        this.events.dispatch(new SoundEvent(this, 'SOUND_PAUSE'));
        return true;
    },
    resume: function () {
        if (!BaseSound.prototype.resume.call(this)) {
            return false;
        }
        //  \/\/\/ isPlaying = true, isPaused = false \/\/\/
        // TODO implement resume method
        this.events.dispatch(new SoundEvent(this, 'SOUND_RESUME'));
        return true;
    },
    stop: function () {
        if (!BaseSound.prototype.stop.call(this)) {
            return false;
        }
        //  \/\/\/ isPlaying = false, isPaused = false \/\/\/
        // TODO implement stop method
        this.events.dispatch(new SoundEvent(this, 'SOUND_STOP'));
        return true;
    },
    update: function (time, delta) {

    },
    destroy: function () {
        BaseSound.prototype.destroy.call(this);
        // TODO release all HTML5 Audio tag related stuff
    },
    setMute: function () {
        if (this.audio) {
            this.audio.muted = this.currentConfig.mute || this.manager.mute;
        }
    },
    setVolume: function () {
        if (this.audio) {
            this.audio.volume = this.currentConfig.volume * this.manager.volume;
        }
    },
    setRate: function () {
        BaseSound.prototype.setRate.call(this);
        if (this.audio) {
            this.audio.playbackRate = this.totalRate;
        }
    }
});
/**
 * Mute setting.
 *
 * @name Phaser.Sound.HTML5AudioSound#mute
 * @property {boolean} mute
 */
Object.defineProperty(HTML5AudioSound.prototype, 'mute', {
    get: function () {
        return this.currentConfig.mute;
    },
    set: function (value) {
        this.currentConfig.mute = value;
        this.setMute();
        this.events.dispatch(new SoundValueEvent(this, 'SOUND_MUTE', value));
    }
});
/**
 * Volume setting.
 *
 * @name Phaser.Sound.HTML5AudioSound#volume
 * @property {number} volume
 */
Object.defineProperty(HTML5AudioSound.prototype, 'volume', {
    get: function () {
        return this.currentConfig.volume;
    },
    set: function (value) {
        this.currentConfig.volume = value;
        this.setVolume();
        this.events.dispatch(new SoundValueEvent(this, 'SOUND_VOLUME', value));
    }
});
module.exports = HTML5AudioSound;