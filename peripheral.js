var util = require('util');
var bleno = require('bleno');

// A name to advertise our service.
var name = 'HammerheadHH1';

// Use a custom device name.
process.env['BLENO_DEVICE_NAME'] = 'HammerheadHH1';

// The device itself.
var hh = require('./hh');
var hh_device = new hh.Hammerhead();

// Services that we'll run.
var HHService = require('./hh-service');
var hhService = new HHService(hh_device);
var NameService = require('./name-service');
var nameService = new NameService(hh_device);
var DeviceInfoService = require('./device-info-service');
var deviceInfoService = new DeviceInfoService(hh_device);

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [hhService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
        //nameService, // Looks like we need to keep this enabled!
        hhService,
        deviceInfoService
    ]);
  }
});
