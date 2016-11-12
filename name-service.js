var util = require('util');
var bleno = require('bleno');

var DeviceNameCharacteristic = require('./device-name-characteristic');
var AppearanceCharacteristic = require('./appearance-characteristic');
var PreferredParamsCharacteristic = require('./preferred-params-characteristic');

function NameService(hh) {
    bleno.PrimaryService.call(this, {
        uuid: '0000280000001000800000805f9b34fb',
        characteristics: [
            new DeviceNameCharacteristic(hh),
            new AppearanceCharacteristic(hh),
            new PreferredParamsCharacteristic(hh)
        ]
    });
}

util.inherits(NameService, bleno.PrimaryService);

module.exports = NameService;



