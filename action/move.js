const config = require('../config');
const isDay = require('../day.js');
var everhome = require('../everhome.js');

var id = null;

module.exports = function() {
  console.log('Move processed');
  if (!isDay()) {
    if (id) {
      console.log("Clear 'Move' timeout");
      clearTimeout(id);
    } else {
      everhome.scene('TV Schauen');
    }

    id = setTimeout(function() {
      console.log("'Move' end");
      everhome.scene('Ins Bett gehen');
      id = null;
    }, config.MOVE_TIMEOUT);
  }
};
