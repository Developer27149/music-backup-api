const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('koa-router')();
const index = require('./routes/index');

const app = new Koa();
// 错误处理
onerror(app);
// 中间件
app.use(bodyparser());
app.use(json());
app.use(logger());
// app.use(index.routes(), index.allowedMethods());
router.use('/1', index.routes(), index.allowedMethods());
app.use(router.routes());

app.listen(3333);
