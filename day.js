const suncalc = require('suncalc');
const latitude = 49.12;
const longitude = 8.72;

/**
 * Returns if it's day time or not.
 * @param {Number} The minutes the day will be shortend
 * @return {Boolean} true, if it's still day
 */
module.exports = (diff) => {
  diff = diff || 0; // normalize
  diff *= 1000 * 60; // minutes

  const d = new Date();
  const now = d.getTime();
  const sun = suncalc.getTimes(d, latitude, longitude);

  return (now - diff) > sun.sunrise.getTime() &&
    (now + diff) < sun.sunset.getTime();
};
