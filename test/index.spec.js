const assert = require('assert');
const stream = require('stream');
const Koa = require('koa');
const request = require('supertest');
const accesslog = require('..');

const app = new Koa();
const log = new stream.PassThrough();

app.use(accesslog(log));

const pattern = /((?:\d{1,3}\.){3}\d{1,3}).*"(\w{3}) \//;

describe('lib accesslog', function () {
  let agent;
  let server;

  beforeAll(function (done) {
    server = app.listen(done);
    agent = request.agent(server);
  });

  afterAll(function () {
    server.close();
  });

  it('should output an access log', function (done) {
    agent.get('/').end(function (err) {
      if (err) {
        done(err);
        return;
      }

      const match = pattern.exec(log.read());
      assert.equal(match[1], '127.0.0.1');
      assert.equal(match[2], 'GET');
      done();
    });
  });
});
