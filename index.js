console.log('HOME server started');

var everhome = require('./everhome.js');
var ifttt = require('./ifttt.js');
var wd = require('webdriver-sync');


// while (true) {
//   wd.sleep(2*60);

  try {
    ifttt(function(items) {
      items.forEach(function(item) {
        var data = item.split(';');
        data.forEach(function(task) {
          if (!task || task.indexOf(':') === -1) {
            return;
          }
          var func = task.split(':')[0];
          var name = task.split(':')[1];

          console.log('Switching "' + func + '(' + name + ')" based on ifttt.');

          everhome[func](name);
        });
      });
    });
  } catch (e) {
    console.error(e);
  }
// }

// everhome.device('Stehlampe');
