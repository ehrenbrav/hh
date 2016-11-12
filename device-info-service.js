var util = require('util');
var bleno = require('bleno');

var MfgNameCharacteristic = require('./mfg-name-characteristic');
var SerialCharacteristic = require('./serial-characteristic');
var HardwareRevCharacteristic = require('./hardware-rev-characteristic');
var FirmwareRevCharacteristic = require('./firmware-rev-characteristic');
var SoftwareRevCharacteristic = require('./software-rev-characteristic');
var SysIDCharacteristic = require ('./sys-id-characteristic');

function DeviceInfoService(hh) {
    bleno.PrimaryService.call(this, {
        uuid: '0000180a00001000800000805f9b34fb',
        characteristics: [

            new MfgNameCharacteristic(hh),
            new SerialCharacteristic(hh),
            new HardwareRevCharacteristic(hh),
            new FirmwareRevCharacteristic(hh),
            new SoftwareRevCharacteristic(hh),
            new SysIDCharacteristic(hh)
        ]
    });
}

util.inherits(DeviceInfoService, bleno.PrimaryService);

module.exports = DeviceInfoService;



