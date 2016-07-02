var device = function(name) {
  var path = require('path');
  var childProcess = require('child_process');
  var phantomjs = require('phantomjs-prebuilt');
  var binPath = phantomjs.path;

  var childArgs = [
    path.join(__dirname, 'device.js'),
    'device', 'Stehlampe'
  ]

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    // handle results
    console.log(stdout);
  })
};

module.exports = {
  device: device
};
