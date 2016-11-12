var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function SysIDCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a2300001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(SysIDCharacteristic, bleno.Characteristic);

SysIDCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from('d7 bc ae 52 42 56 34 12', 'hex');
    console.log("Read: SysIDCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = SysIDCharacteristic;
