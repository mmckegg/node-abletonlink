const path = require('node-gyp-build').path(__dirname)
const nbind = require('nbind');
const binding = nbind.init(path);
const lib = binding.lib;

console.log(path)

lib.AbletonLink.prototype.startUpdate = function(interval_ms, callback) {
    this.update();
    if(callback) {
        this.timer = setInterval(() => {
            this.update();
            callback(this.beat, this.phase, this.bpm);
        }, interval_ms);
        callback(this.beat, this.phase, this.bpm);
    } else {
        this.timer = setInterval(() => {
            this.update();
        }, interval_ms);
    }
};

lib.AbletonLink.prototype.stopUpdate = function() {
    if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
}

module.exports = lib.AbletonLink;
