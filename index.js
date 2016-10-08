const dropbox = require('./dropbox.js');
const everhome = require('./everhome.js');

const move = require('./action/move.js');

console.log('Server started...');

dropbox.check((msg) => {
  if (msg.type === 'move') {
    move(msg.data);
  } else if (msg.type === 'scene') {
    everhome.scene(msg.data);
  }
});
