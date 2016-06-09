var config = require('./config');
var user = require('./user');
var wd = require('webdriver-sync');

var login = function() {
  var ChromeDriver = wd.ChromeDriver;
  var driver = new ChromeDriver();
  // var PhantomJSDriver = wd.PhantomJSDriver;
  // var driver = new PhantomJSDriver();

  driver.get(config.URL);

  // click the 'Anmelden' button
  driver.findElement(wd.By.cssSelector('.mdl-layout__drawer-button')).click();
  wd.sleep(500);
  driver.findElement(wd.By.cssSelector('#header-login-button')).click();
  driver.findElement(wd.By.cssSelector('.mdl-layout__obfuscator')).click();

  wd.sleep(500);

  driver.findElement(wd.By.cssSelector('#email')).sendKeys(user.name);
  driver.findElement(wd.By.cssSelector('#pw')).sendKeys(user.password);
  driver.findElement(wd.By.cssSelector('button[type=submit]')).click();

  wd.wait(function() {
    return driver.findElements(wd.By.cssSelector('div.cloudboxStatus')).length > 0;
  }, { timeout: 3000, period: 100 });

  return driver;
};

var logout = function(driver) {
  wd.sleep(1000);
  driver.get('https://everhome.de/api/user/logout');

  driver.quit();
}

var device = function(name) {
  const driver = login(driver);

  driver.findElement(wd.By.cssSelector('a[href="/dashboard/devices"')).click();
  driver.findElement(wd.By.cssSelector('button[devicename="' + name + '"].btn-primary')).click();

  console.log(new Date() + '', ': Device "' + name + '" triggered');

  logout(driver);
};

var scene = function(name) {
  const driver = login(driver);

  driver.findElement(wd.By.cssSelector('a[href="/dashboard/scenes"')).click();
  driver.findElement(wd.By.cssSelector('button[scenename="' + name + '"]')).click();

  console.log(new Date() + '', ': Scene "' + name + '" triggered');

  logout(driver);
};


module.exports = {
  scene: scene,
  device: device
}
