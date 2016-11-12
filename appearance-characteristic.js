var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function AppearanceCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a0100001000800000805f9b34fb',
    properties: ['read'],
  });

  this.hh = hh;
}

util.inherits(AppearanceCharacteristic, bleno.Characteristic);

AppearanceCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from('0000', 'hex');
    console.log("Read: AppearanceCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = AppearanceCharacteristic;



