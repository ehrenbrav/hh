var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function ServiceChangedCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a0500001000800000805f9b34fb',
    properties: ['write'],
  });

  this.hh = hh;
}

util.inherits(ServiceChangedCharacteristic, bleno.Characteristic);

ServiceChangedCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 2) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    // TODO do something useful.
    console.log("Write: ServiceChangedCharacteristic.");
    callback(this.RESULT_SUCCESS);
  }
};


module.exports = ServiceChangedCharacteristic;
