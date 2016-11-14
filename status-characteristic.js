var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');

function StatusCharacteristic(hh) {
  bleno.Characteristic.call(this, {
    uuid: '754d0002d49225ad29498e904f2f3869',
      properties: ['writeWithoutResponse', 'write'],
  });

  this.hh = hh;
}

util.inherits(StatusCharacteristic, bleno.Characteristic);

StatusCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    if (offset) {
        callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data[0] == 0x01 && data[1] == 0x40 && data[2] == 0xff && data[3] == 0xff) {
        console.log("Lights off");
        callback(this.RESULT_SUCCESS);
    }
    else if (data[0] == 0xb4 && data[1] == 0xff && data[2] == 0xff && data[3] == 0xff) {
        console.log("Rider stopped ride from app");
        callback(this.RESULT_SUCCESS);
    }
    else if (data[0] == 0x03 && data[1] == 0xff && data[2] == 0x08 && data[3] == 0x0b) {
        console.log("Rerouting");
        callback(this.RESULT_SUCCESS);
    }
    else if (data[0] != 0x01) {
        console.log("Not a turn signal", data);
        callback(this.RESULT_SUCCESS);
    }
    else if (data[1] == 0xff) {
        switch(data[2]) {
        case 0x01:
            console.log("Immediate Right");
            break;
        case 0x02:
            console.log("Immediate Left");
            break;
        case 0x03:
            console.log("Immediate Slight Right");
            break;
        case 0x04:
            console.log("Immediate Slight Left");
            break;
        case 0x07:
            console.log("Reached Destination");
            break;
        default:
            console.log("Unknown White", data);
            break;
        }
        callback(this.RESULT_SUCCESS);
    }
    else {
        switch(data[2]) {
        case 0x01:
            console.log("Right");
            break;
        case 0x02:
            console.log("Left");
            break;
        case 0x03:
            console.log("Slight Right");
            break;
        case 0x04:
            console.log("Slight Left");
            break;
        case 0x05:
            console.log("U-turn Right");
            break;
        case 0x06:
            console.log("U-turn Left");
            break;
        case 0x07:
            console.log("Straight");
            break;
        case 0x08:
            console.log("Reverse");
            break;
        case 0x09:
            console.log("Ramp Right");
            break;
        case 0x0a:
            console.log("Ramp Left");
            break;
        case 0x0b:
            console.log("Roundabout Right");
            break;
        case 0x0c:
            console.log("Roundabout Left");
            break;
        case 0x0d:
            console.log("Upcoming Turn on Right");
            break;
        case 0x0e:
            console.log("Upcoming Turn on Left");
            break;
        default:
            console.log('Unknown', data);
            break;
        }
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = StatusCharacteristic;



