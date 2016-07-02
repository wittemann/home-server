console.log('HOME server started');

var dropbox = require('./dropbox.js');
var wd = require('webdriver-sync');
var config = require('./config');


var everhome = require('./everhome.phantom.js')

everhome.device('Stehlampe');

return;

const move = require('./action/move.js');


function main() {
  console.log('Checking...');
  dropbox.check(function(msg) {
    if (msg.type === 'move') {
      move();
    }
  });
};

// initial run
main();

setInterval(main, config.MAIN_LOOP_TIMEOUT);
