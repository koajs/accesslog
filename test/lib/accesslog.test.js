var koa       = require('koa');
var assert    = require('assert');
var request   = require('supertest');
var stream    = require('stream');
var accesslog = require('../..');

var app = koa();
var log = new stream.PassThrough();

app.use(accesslog(log));

var pattern = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}).*"(\w{3}) \//;

describe('lib accesslog', function () {

  var agent;
  var server;

  before(function (done) {
    server = app.listen(done);
    agent = request.agent(server);
  });

  after(function () {
    server.close();
  });

  it('should output an access log', function (done) {
    agent.get('/').end(function (err) {
      if (err) {
        done(err);
        return;
      }
      var match = pattern.exec(log.read());
      assert.equal(match[1], '127.0.0.1');
      assert.equal(match[2], 'GET');
      done();
    });
  });

});
