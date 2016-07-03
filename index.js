const dropbox = require('./dropbox.js');

const move = require('./action/move.js');

dropbox.check(function(msg) {
  if (msg.type === 'move') {
    move(msg.data);
  }
});
