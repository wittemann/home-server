console.log('HOME server started');

var everhome = require('./everhome.js');
var dropbox = require('./dropbox.js');
var wd = require('webdriver-sync');

const isDay = require('./day.js');

dropbox.check(function(msg) {
  console.log(msg);
});

// while (true) {
//   wd.sleep(10000);
//
//   try {
//     console.log('Check on ifttt');
//     ifttt(function(items) {
//       items.forEach(function(item) {
//         var data = item.split(';');
//         data.forEach(function(task) {
//           if (!task || task.indexOf(':') === -1) {
//             return;
//           }
//           var func = task.split(':')[0];
//           var name = task.split(':')[1];
//
//           console.log('Switching "' + func + '(' + name + ')" based on ifttt.');
//
//           everhome[func](name);
//         });
//       });
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }
