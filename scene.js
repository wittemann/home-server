var config = require('./config');
var user = require('./user');

module.exports = function(scenename) {
  var wd = require('webdriver-sync');
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

  driver.findElement(wd.By.cssSelector('a[href="/dashboard/scenes"')).click();
  driver.findElement(wd.By.cssSelector('button[scenename="' + scenename + '"]')).click();
}


function bookTime() {
  // var driver = new ChromeDriver();
  // driver.get(TIMSATO_URI);
  //
  // driver.findElement(wd.By.cssSelector('#username')).sendKeys(insideUser);
  // driver.findElement(wd.By.cssSelector('#password')).sendKeys(insidePassword);
  // driver.findElement(wd.By.cssSelector('input.btn-submit')).click();
  //
  // wd.wait(function() {
  //   return driver.findElements(wd.By.cssSelector('a[href^="enter/effort"]')).length > 0;
  // }, { timeout: 3000, period: 100 });

  driver.findElement(wd.By.cssSelector('a[href^="enter/effort"]')).click();
  driver.findElement(wd.By.cssSelector('input[name="duration"]')).sendKeys(DURATION);
  driver.findElement(wd.By.cssSelector('option[value="p.tlb.maildev+access"]')).click();
  driver.findElement(wd.By.cssSelector('option[value="dev"]')).click();

  driver.findElement(wd.By.cssSelector('input[name="submit_new"]')).click();

  wd.wait(function() {
    return driver.findElements(wd.By.cssSelector('input[name^=trash]')).length > 0;
  }, { timeout: 3000, period: 100 });

  // driver.quit();
}
