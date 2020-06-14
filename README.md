# [Accesslog](https://github.com/koajs/accesslog)

Output [Common Log Format](http://en.wikipedia.org/wiki/Common_Log_Format) access logs to any stream. Defaults to `process.stdout`.

## Install

```bash
# npm ..
npm i koa-accesslog
# yarn ..
yarn add koa-accesslog
```

## Usage

```js
const Koa = require('koa');
const accesslog = require('koa-accesslog');
const app = new Koa();

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
const log = new stream.PassThrough();
app.use(accesslog(log));
```

## License

MIT