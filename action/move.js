var everhome = require('../everhome.js');

module.exports = function(on) {
  if (on) {
    everhome.scene('tv schauen');
  } else {
    everhome.scene('ins bett gehen');
  }
};
