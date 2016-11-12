var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function FirmwareRevCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a2600001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(FirmwareRevCharacteristic, bleno.Characteristic);

FirmwareRevCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(4);
    data.string('v1.0', 0);
    console.log("Read: FirmwareRevCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = FirmwareRevCharacteristic;
