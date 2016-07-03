var DROPBOX_PATH = '/home-server';

var user = require('./user');
var node_dropbox = require('node-dropbox');


exports.check = function(clb) {
  var api = node_dropbox.api(user.dropbox);
  api.getMetadata(DROPBOX_PATH, function(err, res, body) {
  	var files = body.contents;
    files.forEach(function(file) {
      api.getFile(file.path, function(err, res, body) {
        clb(body);
        api.removeFile(file.path, function(err, res, body) {
          // ignore
        });
      });
    });
  });
}
