const xhr = require('node-xhr');
const user = require('./user');

const deviceIds = {
  beregner: 46,
  stehlampe: 16,
};
const sceneIds = {
  'alles aus': 2,
  'ins bett gehen': 4,
  'rasen gießen': 7,
  'tv schauen': 13,
};


const req = function (endpoint, body, clb) {
  xhr.post({
    url: `https://eta.everhome.de/${endpoint}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body,
  }, (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }

    clb(res);
  });
};


const login = (user, pwd, clb) => {
  const data = `email=${encodeURIComponent(user)}&pw=${encodeURIComponent(pwd)}`;
  req('api/user/login', data, (res) => {
    if (res.body === 'ok') {
      let token = res.headers['set-cookie'][0];
      token = token.split(';')[0].split('=')[1];

      clb(token);
    }
  });
};

const device = function (token, id, action) {
  const data = `t=${token}&d=${id}&a=${action}`;
  req('hub', data, function (res) {
    if (res.body === 'ok') {
      console.log(new Date() + '', ': Device "' + id + '" switched to ' + action);
    } else {
      console.log(new Date() + '', ': Could not trigger device' + id);
    }
  });
};

const scene = function (token, id) {
  const data = `t=${token}&s=${id}`;
  req('hub', data, (res) => {
    if (res.body === 'ok') {
      console.log(new Date() + '', ': Scene "' + id + '" triggered');
    } else {
      console.log(new Date() + '', ': Could not trigger scene ' + id);
    }
  });
};

module.exports = {
  device: (name, action) => {
    login(user.name, user.password, (token) => {
      device(token, deviceIds[name.toLowerCase()], action);
    });
  },
  scene: (name) => {
    login(user.name, user.password, (token) => {
      scene(token, sceneIds[name.toLowerCase()]);
    });
  },
};
