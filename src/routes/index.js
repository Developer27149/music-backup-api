const router = require('koa-router')();

router.get('/ok', async (ctx) => {
  ctx.body = 'ok';
});

router.get('/name', async (ctx) => {
  ctx.body = {
    name: 'aaron',
  };
});

module.exports = router;
