var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function SerialCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a2500001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(SerialCharacteristic, bleno.Characteristic);

SerialCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from('b9e3b0c21f5c7e4601', 'hex');
    console.log("Read: SerialCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = SerialCharacteristic;
