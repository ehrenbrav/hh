var util = require('util');
var bleno = require('bleno');

var LightCharacteristic = require('./light-characteristic');
var StatusCharacteristic = require('./status-characteristic');

function HHService(hh) {
    bleno.PrimaryService.call(this, {
        uuid: '754d0001d49225ad29498e904f2f3869',
        characteristics: [

            new LightCharacteristic(hh),
            new StatusCharacteristic(hh),
        ]
    });
}

util.inherits(HHService, bleno.PrimaryService);

module.exports = HHService;



