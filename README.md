# [Accesslog](https://github.com/koajs/accesslog)

Output [Common Log Format](http://en.wikipedia.org/wiki/Common_Log_Format) access logs to any stream. Defaults to `process.stdout`.

> Notice: We recommend using `@koa/access-log` for installation, as both `koa-accesslog` and `@koa/access-log` refer to the same module. However, in our next major version bump (v2), we will deprecate `koa-accesslog` and only maintain `@koa/access-log`.

## Install

```bash
# npm ..
npm i koa-accesslog
# yarn ..
yarn add koa-accesslog
```

or

```bash
# npm ..
npm i @koa/access-log
# yarn ..
yarn add @koa/access-log
```

## Usage

```js
const Koa = require('koa');
const accesslog = require('koa-accesslog');
// or
// const accesslog = require('@koa/access-log');
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

[MIT](LICENSE)
