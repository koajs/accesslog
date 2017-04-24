
const fs     = require('fs')
const util   = require('util')
const moment = require('moment')

module.exports = function (stream) {
  if (!stream) {
    stream = process.stdout
  }
  return async function (ctx, next) {
    await next()

    // ip, date, method, path, status and length
    let format = '%s - - [%s] "%s %s HTTP/1.X" %d %s\n'

    let length = ctx.length ? ctx.length.toString() : '-'
    let date = moment().format('D/MMM/YYYY:HH:mm:ss ZZ')

    stream.write(util.format(format, ctx.ip, date, ctx.method, ctx.path, ctx.status, length))
  }
}
