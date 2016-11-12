var util = require('util');
var bleno = require('bleno');

var ServiceChangedCharacteristic = require('./service-changed-characteristic');

function ChangeService(hh) {
    bleno.PrimaryService.call(this, {
        uuid: '0000280000001000800000805f9b34fb',
        characteristics: [
            new ServiceChangedCharacteristic(hh)
        ]
    });
}

util.inherits(ChangeService, bleno.PrimaryService);

module.exports = ChangeService;



