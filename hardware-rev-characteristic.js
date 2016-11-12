var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function HardwareRevCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a2700001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(HardwareRevCharacteristic, bleno.Characteristic);

HardwareRevCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(4);
    data.string('v1.0', 0);
    console.log("Read: HardwareRevCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = HardwareRevCharacteristic;
