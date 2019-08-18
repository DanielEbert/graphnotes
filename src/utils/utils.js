

export function getDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var min = new Date().getMinutes();
  var hour = new Date().getHours();

  if (date < 10) {
    date = '0' + date
  }

  if (min < 10) {
    min = '0' + min
  }

  if (hour < 10) {
    hour = '0' + hour
  }

  return date + '.' + month + '.' + year + ' ' + hour + ':' + min
}