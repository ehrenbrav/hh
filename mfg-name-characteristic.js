var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function MfgNameCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a2900001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(MfgNameCharacteristic, bleno.Characteristic);

MfgNameCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(16);
    console.log("Read: MfgNameCharacteristic.");
    data.string('Hammerhead Inc.', 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = MfgNameCharacteristic;
