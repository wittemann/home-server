var user = require('./user');
var system = require('system');

var unit = system.args[1];
var name = system.args[2];



var page = require('webpage').create();
page.open('https://everhome.de', function(status) {

  page.onUrlChanged = function(targetUrl) {

    if (targetUrl === 'https://eta.everhome.de/dashboard/devices') {
      setTimeout(function() {
        var rect = page.evaluate(function(device) {
          var btn = document.querySelector('button[devicename="' + device + '"].btn-primary');
          btn.scrollIntoView();
          return btn.getBoundingClientRect();
        }, name);

        page.sendEvent('mouseup', rect.left + 5, rect.top + 5);

        console.log(new Date() + '', ': Device "' + name + '" triggered');

        setTimeout(function() {
          phantom.exit();
        }, 1000);
      }, 3000);
    } 

    if (targetUrl === 'https://eta.everhome.de/dashboard') {
      setTimeout(function() {
        page.evaluate(function(device) {
          document.querySelector('a[href="/dashboard/devices"]').click();
        });
      }, 3000);

    }
  };

  page.evaluate(function(usr, pwd) {
    document.querySelectorAll("[data-target='#login-modal']")[1].click();
    document.querySelector("#email").value = usr;
    document.querySelector("#pw").value = pwd;
    document.querySelector('button[type=submit]').click();
  }, user.name, user.password);

});
