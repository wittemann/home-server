var dropbox = require('./dropbox.js');
var config = require('./config');

const move = require('./action/move.js');


dropbox.check(function(msg) {
  if (msg.type === 'move') {
    move(msg.data);
  }
});
