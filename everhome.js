var xhr = require('node-xhr');
var user = require('./user');

var deviceIds = {
  "Beregner": 46,
  "Stehlampe": 16
};
var sceneIds = {
  "Alles aus": 2,
  "Ins Bett gehen": 4,
  "Rasen gießen": 7,
  "TV schauen": 5
};


var login = function(user, pwd, clb) {
  var data = "email=" + encodeURIComponent(user) + "&pw=" + encodeURIComponent(pwd);
  req('api/user/login', data, function(res) {
    if (res.body === 'ok') {
      var token = res.headers['set-cookie'][0];
      token = token.split(';')[0].split('=')[1];

      clb(token);
    }
  });
};

var device = function(token, id, action) {
  var data = "t=" + token + "&d=" + id + "&a=" + action;
  req('hub', data, function(res) {
    if (res.body === 'ok') {
      console.log(new Date() + '', ': Device "' + id + '" switched to ' + action);
    } else {
      console.log(new Date() + '', ': Could not trigger device' + id);
    }
  });
};

var scene = function(token, id) {
  var data = "t=" + token + "&s=" + id;
  req('hub', data, function(res) {
    if (res.body === 'ok') {
      console.log(new Date() + '', ': Scene "' + id + '" triggered');
    } else {
      console.log(new Date() + '', ': Could not trigger scene ' + id);
    }
  });
};

var req = function(endpoint, body, clb) {
  xhr.post({
    url : 'https://everhome.de/' + endpoint,
    headers : {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body : body
  }, function(err, res) {
    if (err) {
        console.log(err.message);
        return;
    }

    clb(res);
  });
}




module.exports = {
  device: function(name, action) {
    login(user.name, user.password, function(token) {
      device(token, deviceIds[name], action);
    });
  },
  scene: function(name) {
    login(user.name, user.password, function(token) {
      scene(token, sceneIds[name]);
    });
  }
}
