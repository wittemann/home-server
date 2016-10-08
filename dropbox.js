const DROPBOX_PATH = '/home-server';

const user = require('./user');
const nodeDropbox = require('node-dropbox');

exports.check = (clb) => {
  const api = nodeDropbox.api(user.dropbox);
  api.getMetadata(DROPBOX_PATH, (err, res, body) => {
    const files = body.contents;
    files.forEach((file) => {
      api.getFile(file.path, (err, res, body) => {
        clb(body);
        api.removeFile(file.path, () => {
          // ignore
        });
      });
    });
  });
};
