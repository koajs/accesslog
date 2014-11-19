# Accesslog

Output [Common Log Format](http://en.wikipedia.org/wiki/Common_Log_Format) access logs to any stream. Defaults to `process.stdout`.

## Install

```
npm install koa-accesslog
```

## Usage

```js
var koa = require('koa');
var accesslog = require('koa-accesslog');
var app = koa();

app.use(accesslog());

```

## Output

```
127.0.0.1 - - [19/Nov/2014:13:47:37 +0100] "GET / HTTP/1.X" 404 -
```

## Configure

You may configure Accesslog to use any writable stream such as an
instance of `stream.PassThrough` as seen below.

```js
var log = new stream.PassThrough();
app.use(accesslog(log));
```

## License

MIT
