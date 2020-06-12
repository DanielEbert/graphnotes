

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  console.log(JSON.parse(window.atob(base64)))
  return JSON.parse(window.atob(base64));
};

export function epochToDate(epoch) {
  var d = new Date(0)
  d.setUTCSeconds(epoch)
  return d
}