var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function LightCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '754d0003d49225ad29498e904f2f3869',
    properties: ['read'],
    //descriptors: [
    //  new bleno.Descriptor({
    //    uuid: '2901',
    //   value: 'Gets or sets the type of pizza crust.'
    //  })
    //]
  });

  this.hh = hh;
}

util.inherits(LightCharacteristic, bleno.Characteristic);

LightCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(14);
    data.string('light_read', 0);
    console.log("Read: LightCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = LightCharacteristic;
