console.log('HOME server started');

var everhome = require('./everhome.js');
var ifttt = require('./ifttt.js');
var wd = require('webdriver-sync');

// ifttt(function(items) {
//   console.log('ITEMS:', items, items.length);
// });

// while (true) {
//   wd.sleep(10000);
// }

everhome.device('Stehlampe');
