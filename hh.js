var util = require('util');
var events = require('events');

function Hammerhead() {
  events.EventEmitter.call(this);
}

util.inherits(Hammerhead, events.EventEmitter);
module.exports.Hammerhead = Hammerhead;





