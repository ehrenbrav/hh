var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function LightCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '754d0003d49225ad29498e904f2f3869',
    properties: ['notify', 'read'],
  });

  this.hh = hh;
}

util.inherits(LightCharacteristic, bleno.Characteristic);

LightCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    const data = Buffer.from("hi", "ascii");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = LightCharacteristic;
