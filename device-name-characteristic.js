var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function DeviceNameCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '00002a0000001000800000805f9b34fb',
    properties: ['notify', 'read'],
    //descriptors: [
    //  new bleno.Descriptor({
    //    uuid: '2901',
    //    value: 'Gets or sets the type of pizza crust.'
    //  })
    //]
  });

  this.hh = hh;
}

util.inherits(DeviceNameCharacteristic, bleno.Characteristic);

DeviceNameCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from('HammerheadHH1', 'ascii');
    console.log("Read: DeviceNameCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = DeviceNameCharacteristic;
