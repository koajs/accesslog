# Accesslog

Output common log format access logs to any stream. Defaults to `process.stdout`.

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

## Configure

You may configure Accesslog to use any writable stream such as an
instance of `stream.PassThrough` as seen below.

```js
var log = new stream.PassThrough();
app.use(accesslog(log));
```

## License

MIT
