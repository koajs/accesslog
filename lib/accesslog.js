var fs     = require('fs');
var util   = require('util');
var moment = require('moment');

module.exports = function (stream) {
  if (!stream) {
    stream = process.stdout;
  }
  return function* (next) {
    yield* next;

    // ip, date, method, path, status and length
    var format = '%s - - [%s] "%s %s HTTP/1.X" %d %s\n';

    var length = this.length ? this.length.toString() : '-';
    var date = moment().format('D/MMM/YYYY:HH:mm:ss ZZ');

    stream.write(util.format(format, this.ip, date, this.method, this.path, this.status, length));
  };
};
