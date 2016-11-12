var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function StatusCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '754d0002d49225ad29498e904f2f3869',
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

util.inherits(StatusCharacteristic, bleno.Characteristic);

StatusCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(14);
    data.string('status_test', 0);
    console.log("Read: StatusCharacteristic.");
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = StatusCharacteristic;
