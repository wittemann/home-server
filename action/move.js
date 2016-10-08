const everhome = require('../everhome.js');

module.exports = (on) => {
  if (on) {
    everhome.scene('tv schauen');
  } else {
    everhome.scene('ins bett gehen');
  }
};
