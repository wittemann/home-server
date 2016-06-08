console.log('HOME server started');

var scene = require('./scene.js');
var ifttt = require('./ifttt.js');

// ifttt(function(items) {
//   console.log('ITEMS:', items, items.length);
// });

scene('TV Schauen');
