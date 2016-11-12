var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function PreferredParamsCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a0400001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(PreferredParamsCharacteristic, bleno.Characteristic);

PreferredParamsCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from('20003c0000009001', 'hex');
    console.log("Read: PreferredParamsCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = PreferredParamsCharacteristic;



