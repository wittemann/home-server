const suncalc = require('suncalc');

/**
 * Returns if its day time or not.
 * @param {Number} The minutes the day will be shortend
 * @return {Boolean} true, if it's still day
 */
module.exports = function(diff) {
  diff = diff || 0; // normalize
  diff *= 1000 * 60; // minutes

  const d = new Date();
  const now = d.getTime();
  const sun = suncalc.getTimes(d, 49.12, 8.72);

  return (now - diff) > sun.sunrise.getTime() &&
    (now + diff) < sun.sunset.getTime();
}
