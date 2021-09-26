const Koa = require('koa');
const json = require('koa-json');
const cors = require('koa2-cors');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('koa-router')();
const index = require('./routes/index');
require('./init');

const app = new Koa();
// 错误处理
onerror(app);
// 中间件
app.use(cors());
app.use(bodyparser());
app.use(json());
app.use(logger());
router.use('/api', index.routes(), index.allowedMethods());
app.use(router.routes());
app.listen(3333);
module.exports = app;
