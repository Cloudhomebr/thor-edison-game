var SerialPort = require("serialport").SerialPort;
var sp         = new SerialPort("/dev/cu.usbmodem1423", {
    baudRate: 9600,
    databits: 8,
    parity: 'even',
    stopbits: 1,
    flowControl: false

});
sp.on("open", function () {
  console.log('open');
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
});