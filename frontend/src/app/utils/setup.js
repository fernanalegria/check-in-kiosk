var rootUrl = 'http://localhost:8080';

/**
 * Generates random tokens of a given length
 * @param  {nunmber} length
 * @returns  {string} Token
 */
function generateToken(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

/**
 * Sets cookie
 * @param  {string} cname Name
 * @param  {string} cvalue Value
 * @param  {nunmber} exdays Days to expire
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * Gets a cookie by its name
 * @param  {string} name Name
 * @returns  {string} Value
 */
function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2)
    return parts
      .pop()
      .split(';')
      .shift();
}

/**
 * Makes a request to login into the specified app
 * @param  {string} appName
 */
function goToApp(appName) {
  var appToken = getCookie('apptoken');
  if (!appToken) {
    appToken = generateToken(50);
    setCookie('apptoken', appToken, 1);
  }
  fetch(rootUrl + '/app/' + appName + '/').then(function() {
    window.location.href = rootUrl + '/login/drchrono/';
  });
}
