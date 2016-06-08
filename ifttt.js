var parse = require('parse-rss');
var config = require('./config');
var fs = require('fs');

module.exports = function(clb) {
  var lastDate = fs.readFileSync(config.LAST_DATE_PATH).toString();

  parse(config.RSS_URL, function(err, rss) {
    var data = [];
    if (err) {
      done(clb, data);
      return;
    };

    for (var i = 0; i < rss.length; i++) {
      var date = (new Date(rss[i].date)).getTime();

      // break on old entries
      if (date < lastDate) {
        continue;
      }
      data.push(rss[i].title);
    }
    done(clb, data);
  });
};

var done = function(clb, data) {
  fs.writeFileSync(config.LAST_DATE_PATH, Date.now() + '');
  clb(data);
}
