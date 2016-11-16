var util = require('util');
var bleno = require('bleno');
var hh = require('./hh');
var haptics = require('./haptics');

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
    else if (data[0] == 0xb3 && data[1] == 0x01 && data[2] == 0xff && data[3] == 0xff) {
        console.log("Navigation Started.");
        var result = haptics.Open();
        callback(this.RESULT_SUCCESS);
    }
    else if (data[0] == 0x01 && data[1] == 0x40 && data[2] == 0xff && data[3] == 0xff) {
        console.log("Lights off");
        haptics.Reset();
        callback(this.RESULT_SUCCESS);
    }
    else if (data[0] == 0xb4 && data[1] == 0xff && data[2] == 0xff && data[3] == 0xff) {
        console.log("Rider stopped ride from app");
        haptics.Reset()
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
            haptics.Buzz(haptics.MOTOR.RIGHT, 500);
            break;
        case 0x02:
            console.log("Immediate Left");
            haptics.Buzz(haptics.MOTOR.LEFT, 500);
            break;
        case 0x03:
            console.log("Immediate Slight Right");
            haptics.Buzz(haptics.MOTOR.FRONT_RIGHT, 500);
            break;
        case 0x04:
            console.log("Immediate Slight Left");
            haptics.Buzz(haptics.MOTOR.FRONT_LEFT, 500);
            break;
        case 0x07:
            console.log("Reached Destination");
            haptics.BuzzAll(750);
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
            haptics.Buzz(haptics.MOTOR.RIGHT, 500);
            break;
        case 0x02:
            console.log("Left");
            haptics.Buzz(haptics.MOTOR.LEFT, 500);
            break;
        case 0x03:
            console.log("Slight Right");
            haptics.Buzz(haptics.MOTOR.FRONT_RIGHT, 500); 
            break;
        case 0x04:
            console.log("Slight Left");
            haptics.Buzz(haptics.MOTOR.FRONT_LEFT, 500);
            break;
        case 0x05:
            console.log("U-turn Right");
            break;
        case 0x06:
            console.log("U-turn Left");
            break;
        case 0x07:
            console.log("Straight");
            haptics.Buzz(haptics.MOTOR.FRONT, 250);
            break;
        case 0x08:
            console.log("Reverse");
            haptics.Buzz(haptics.MOTOR.BACK, 250);
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
            haptics.Buzz(haptics.MOTOR.RIGHT, 250);
            haptics.Buzz(haptics.MOTOR.FRONT, 250);
            break;
        case 0x0e:
            console.log("Upcoming Turn on Left");
            haptics.Buzz(haptics.MOTOR.LEFT, 250);
            haptics.Buzz(haptics.MOTOR.FRONT, 250);
            break;
        default:
            console.log('Unknown', data);
            break;
        }
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = StatusCharacteristic;



